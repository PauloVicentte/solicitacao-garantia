export function formatarStatus(status?: string): 'Em análise' | 'Aprovado' | 'Negado' {
    if (!status) return 'Em análise';
    const s = status.toLowerCase();
    if (s.includes('analise')) return 'Em análise';
    if (s.includes('aprov')) return 'Aprovado';
    if (s.includes('neg')) return 'Negado';
    return 'Em análise';
}

export function formatarData(data?: string): string {
    return new Date(data || new Date().toISOString()).toLocaleDateString('pt-BR');
}

export function criarMensagemDetalhes(solicitacao: any): string {
    const cliente = solicitacao.cliente;
    const aparelho = solicitacao.detalhes?.beneficio?.infoAparelho;
    const notificacao = solicitacao.detalhes?.info?.notificacao;

    return `
    <div style="line-height:1.6">
      <h6>Informações do Cliente</h6>
      <p><strong>Nome:</strong> ${cliente.nome}</p>
      <p><strong>CPF:</strong> ${cliente.cpf}</p>
      <p><strong>Celular:</strong> ${cliente.celular}</p>

      <h6>Informações do Dispositivo</h6>
      <p><strong>Marca:</strong> ${aparelho?.Marca || '-'}</p>
      <p><strong>Modelo:</strong> ${aparelho.Modelo || '-'}</p>

      <h6>Informações da Solicitação</h6>
      <p><strong>Status:</strong> ${solicitacao.status}</p>
      <p><strong>Notificação:</strong> ${notificacao || '-'}</p>
    </div>
  `;
}
