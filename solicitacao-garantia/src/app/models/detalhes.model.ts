export interface InfoAparelho {
  marca: string;
  modelo: string;
  notaFiscal: string;
  dataCompra: string;
  tipoDefeito: string;
  descricao: string;
}

export interface BeneficioSolicitado {
  modelo?: string;
  marca?: string;
  nome?: string;
  cpf?: string;
  celular?: string;
  infoAparelho: InfoAparelho;
}

export interface InfoSolicitacao {
  status?: string;
  notificacao?: string;
  dataSolicitacao?: string;
}

export interface Detalhes {
  beneficioSolicitado?: BeneficioSolicitado;
  infoSolicitacao?: InfoSolicitacao;
  [key: string]: any;
}
