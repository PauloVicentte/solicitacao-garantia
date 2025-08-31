import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosCliente } from '../models/cliente.model';
import { DadosAparelho } from '../models/aparelho.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly url = '/engine-rest/process-definition/key/';

  constructor(private http: HttpClient) { }

  enviarSolicitacao(cliente: DadosCliente, aparelho: DadosAparelho): Observable<any> {
    const payload = {
      beneficioSolicitado: {
        type: 'Json',
        value: JSON.stringify({
          nome: cliente.nome,
          cpf: cliente.cpf,
          dataNascimento: cliente.dataNascimento,
          celular: { ddd: cliente.celular.substring(0, 2), numero: cliente.celular.substring(2) },
          infoAparelho: {
            marca: aparelho.marca,
            modelo: aparelho.modelo,
            notaFiscal: aparelho.notaFiscal,
            dataCompra: aparelho.dataCompra,
            tipoDefeito: aparelho.tipoDefeito,
            descricao: aparelho.descricao
          }
        })
      }
    };

    const PROCESS_ID = 'SolicitacaoGarantiaAparelhos';
    return this.http.post(`${this.url}${PROCESS_ID}/start`, payload);
  }
}
