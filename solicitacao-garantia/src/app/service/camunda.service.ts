import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {
  private camundaUrl = '/engine-rest';

  constructor(private http: HttpClient) { }

  getProcessVariables(processInstanceId: string): Observable<any> {
    return this.http
      .get<any>(`${this.camundaUrl}/process-instance/${processInstanceId}/variables?deserializeValues=false`)
      .pipe(
        map(vars => {
          const parsed: any = {};
          for (const key of Object.keys(vars)) {
            const variable = vars[key];
            if (variable.type === 'Json' || this.isJsonString(variable.value)) {
              try {
                parsed[key] = JSON.parse(variable.value);
              } catch {
                parsed[key] = variable.value;
              }
            } else {
              parsed[key] = variable.value;
            }
          }
          return parsed;
        })
      );
  }

  private isJsonString(str: any): boolean {
    if (typeof str !== 'string') return false;
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }


  getRunningInstances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.camundaUrl}/process-instance`);
  }

  getAllInstancesVariables(): Observable<any[]> {
    return this.getRunningInstances().pipe(
      switchMap(instances => {
        const calls = instances.map(inst =>
          this.getProcessVariables(inst.id).pipe(
            map(vars => ({ id: inst.id, vars }))
          )
        );
        return forkJoin(calls);
      })
    );
  }

  deleteInstance(processInstanceId: string): Observable<any> {
    return this.http.delete(`${this.camundaUrl}/process-instance/${processInstanceId}`);
  }
}
