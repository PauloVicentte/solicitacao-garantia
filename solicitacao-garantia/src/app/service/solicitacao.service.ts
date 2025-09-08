import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosAparelho } from '../models/aparelho.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly url = '/engine-rest/process-definition/key/';
  constructor(private http: HttpClient) { }

  enviarSolicitacao(user: any, aparelho: DadosAparelho): Observable<any> {
    const payload = {
      variables: {
        beneficioSolicitado: {
          value: JSON.stringify({
            nome: user.nome,
            cpf: user.cpf,
            dataNascimento: user.dataNascimento,
            celular: user.celular,
            infoAparelho: {
              marca: aparelho.marca,
              modelo: aparelho.modelo,
              notaFiscal: aparelho.notaFiscal,
              dataCompra: aparelho.dataCompra,
              tipoDefeito: aparelho.tipoDefeito,
              descricao: aparelho.descricao
            }
          }),
          type: 'Json'
        }
      }
    };

    const PROCESS_ID = 'SolicitacaoGarantiaAparelhos';
    return this.http.post(`${this.url}${PROCESS_ID}/start`, payload);
  }
}
