import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CamundaService } from '../../service/camunda.service';
import { interval, Subscription } from 'rxjs';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { criarMensagemDetalhes, formatarData, formatarStatus } from '../../helpers/solicitacao';
import { Solicitacao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-acompanhar-solicitacao',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ModalComponent],
  templateUrl: './acompanhar-solicitacao.component.html',
  styleUrls: ['./acompanhar-solicitacao.component.scss']
})
export class AcompanharSolicitacaoComponent implements OnInit, OnDestroy {
  solicitacoes: Solicitacao[] = [];
  user: any;
  modal = { visivel: false, titulo: '', mensagem: '', cor: 'azul' as 'azul' | 'vermelho' };

  private sub?: Subscription;

  constructor(private camundaService: CamundaService) { }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    this.carregarSolicitacoes();
    this.sub = interval(5000).subscribe(() => this.carregarSolicitacoes());
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private carregarSolicitacoes() {
    this.camundaService.getAllInstancesVariables().subscribe(results => {
      this.solicitacoes = results
        .map(r => this.processarSolicitacao(r))
        .filter(s => s.cliente.cpf === this.user.cpf);
    });
  }

  private processarSolicitacao(r: any): Solicitacao {
    const vars = r.vars;
    return {
      id: r.id,
      idSolicitacao: vars.idSolicitacao,
      nome: vars.beneficioSolicitado?.nome || 'Sem nome',
      data: formatarData(vars.infoSolicitacao?.dataSolicitacao),
      status: formatarStatus(vars.infoSolicitacao?.status),
      cliente: {
        nome: vars.beneficioSolicitado?.nome || '',
        cpf: vars.beneficioSolicitado?.cpf || '',
        celular: vars.beneficioSolicitado?.celular || ''
      },
      detalhes: vars
    };
  }

  mostrarDetalhes(solicitacao: Solicitacao) {
    this.modal.titulo = `Detalhes da Solicitação ${solicitacao.idSolicitacao}`;
    this.modal.mensagem = criarMensagemDetalhes(solicitacao);
    this.modal.cor = 'azul';
    this.modal.visivel = true;
  }

  deletarSolicitacao(solicitacao: Solicitacao) {
    this.camundaService.deleteInstance(solicitacao.id).subscribe(() => {
      this.solicitacoes = this.solicitacoes.filter(s => s.id !== solicitacao.id);
      this.modal.titulo = 'Solicitação Deletada';
      this.modal.mensagem = `A solicitação ${solicitacao.idSolicitacao} foi removida com sucesso.`;
      this.modal.cor = 'vermelho';
      this.modal.visivel = true;
    });
  }

  fecharModal() {
    this.modal.visivel = false;
  }
}
