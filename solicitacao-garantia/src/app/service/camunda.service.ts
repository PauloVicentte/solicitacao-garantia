import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {
  private readonly apiUrl = 'http://localhost:7160/api/processos'; // backend .NET

  constructor(private http: HttpClient) { }

  getProcessVariables(processInstanceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${processInstanceId}/variaveis`);
  }

  getAllInstancesVariables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todas`);
  }

  deleteInstance(processInstanceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${processInstanceId}`);
  }
}
