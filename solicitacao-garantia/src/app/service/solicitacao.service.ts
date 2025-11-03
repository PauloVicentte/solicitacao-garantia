import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosAparelho } from '../models/aparelho.model';
import { Observable } from 'rxjs';
import { User } from './auth.service';

export interface SolicitacaoPayload {
  Nome: string;
  Cpf: string;
  DataNascimento: string;
  Celular: string;
  infoAparelho: {
    Marca: string;
    Modelo: string;
    NotaFiscal: string;
    DataCompra: string;
    TipoDefeito: string;
    Descricao: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly apiUrl = 'http://localhost:7160/api/solicitacao';

  constructor(private readonly http: HttpClient) { }

  enviarSolicitacao(user: User, aparelho: DadosAparelho): Observable<{ processId: string }> {
    const payload: SolicitacaoPayload = {
      Nome: user.nome,
      Cpf: user.cpf,
      DataNascimento: user.dataNascimento,
      Celular: user.celular,
      infoAparelho: {
        Marca: aparelho.marca,
        Modelo: aparelho.modelo,
        NotaFiscal: aparelho.notaFiscal,
        DataCompra: aparelho.dataCompra,
        TipoDefeito: aparelho.tipoDefeito,
        Descricao: aparelho.descricao
      }
    };

    return this.http.post<{ processId: string }>(this.apiUrl, payload);
  }
}
