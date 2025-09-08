import { Detalhes } from './detalhes.model';

export type StatusSolicitacao = 'Em análise' | 'Aprovado' | 'Negado';

export interface Cliente {
  nome: string;
  cpf: string;
  celular: string;
}

export interface Solicitacao {
  id: string;
  idSolicitacao: string;
  nome: string;
  data: string;
  status: StatusSolicitacao;
  cliente: Cliente;
  detalhes: Detalhes;
}
