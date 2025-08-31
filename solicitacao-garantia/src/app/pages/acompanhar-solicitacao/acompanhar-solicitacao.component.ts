import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Solicitacao {
  cliente: any;
  status: 'Em Andamento' | 'Aprovado' | 'Negado';
  etapaAtual?: string;
  dataEntrega?: string;
  causaNegativa?: string;
}

@Component({
  selector: 'app-acompanhar-solicitacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acompanhar-solicitacao.component.html',
  styleUrl: './acompanhar-solicitacao.component.scss'
})
export class AcompanharSolicitacaoComponent {
  emAndamento: Solicitacao[] = [];
  aprovadas: Solicitacao[] = [];
  negadas: Solicitacao[] = [];

  modalAberto: boolean = false;
  clienteSelecionado: any = null;

  ngOnInit() {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    this.emAndamento = [
      { cliente: { nome: 'Paulo', cpf: '123.456.789-00', celular: '21999999999' }, status: 'Em Andamento', etapaAtual: 'Validar informações do cliente' }
    ];
    this.aprovadas = [
      { cliente: { nome: 'Maria', cpf: '987.654.321-00', celular: '21988888888' }, status: 'Aprovado', dataEntrega: '2025-09-05' }
    ];
    this.negadas = [
      { cliente: { nome: 'João', cpf: '111.222.333-44', celular: '21977777777' }, status: 'Negado', causaNegativa: 'Dados incompletos' }
    ];
  }

  verDetalhes(solicitacao: Solicitacao) {
    this.clienteSelecionado = solicitacao.cliente;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.clienteSelecionado = null;
  }

  selecionarNovoAparelho(solicitacao: Solicitacao) {
    alert('Ação para selecionar novo aparelho ou reparo');
  }
}
