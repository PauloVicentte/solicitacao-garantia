import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {
  private readonly url = '/engine-rest/history/process-instance';

  constructor(private http: HttpClient) {}

  processoPorId(processInstanceId: string): Observable<any> {
    return this.http.get(`${this.url}?processInstanceId=${processInstanceId}&deserializeValues=true`);
  }

  tarefasConcluidas(processInstanceId: string): Observable<any> {
    return this.http.get(`/engine-rest/history/task?processInstanceId=${processInstanceId}&sortBy=endTime&sortOrder=asc`);
  }
}
