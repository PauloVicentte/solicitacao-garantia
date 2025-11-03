import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CamundaService } from '../../service/camunda.service';
import { interval, Subscription } from 'rxjs';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { criarMensagemDetalhes, formatarData, formatarStatus } from '../../helpers/solicitacao';
import { Solicitacao } from '../../models/solicitacao.model';
import { AuthService } from '../../service/auth.service';

interface InstanciaCamunda {
  id: string;
  vars: any;
}

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

  constructor(
    private camundaService: CamundaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    if (!this.user) {
      const localUser = localStorage.getItem('user');
      if (localUser) this.user = JSON.parse(localUser);
    }

    this.carregarSolicitacoes();
    this.sub = interval(5000).subscribe(() => this.carregarSolicitacoes());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private carregarSolicitacoes(): void {
    if (!this.user) return;

    this.camundaService.getAllInstancesVariables().subscribe((results: InstanciaCamunda[]) => {
      const cpfUsuario = this.limparCpf(this.user.cpf);

      this.solicitacoes = results
        .map((r: InstanciaCamunda) => this.processarSolicitacao(r))
        .filter((s: Solicitacao) => this.limparCpf(s.cliente.cpf) === cpfUsuario);
    });
  }

  private processarSolicitacao(r: InstanciaCamunda): Solicitacao {
    const vars = r.vars;
    const beneficio = vars?.beneficioSolicitado?.value
      ? JSON.parse(vars.beneficioSolicitado.value)
      : {};
    const info = vars?.infoSolicitacao?.value
      ? JSON.parse(vars.infoSolicitacao.value)
      : {};

    return {
      id: r.id,
      idSolicitacao: vars?.idSolicitacao?.value || 'Sem ID',
      nome: beneficio.Nome || 'Sem nome',
      data: formatarData(info.dataSolicitacao) || '-',
      status: formatarStatus(info.status) || '-',
      cliente: {
        nome: beneficio.Nome || '',
        cpf: beneficio.Cpf || '',
        celular: beneficio.Celular || ''
      },
      detalhes: { beneficio, info }
    };
  }

  private limparCpf(cpf: string): string {
    return cpf?.replace(/\D/g, '') || '';
  }

  mostrarDetalhes(solicitacao: Solicitacao): void {
    this.modal.titulo = `Detalhes da Solicitação ${solicitacao.idSolicitacao}`;
    this.modal.mensagem = criarMensagemDetalhes(solicitacao);
    this.modal.cor = 'azul';
    this.modal.visivel = true;
  }

  deletarSolicitacao(solicitacao: Solicitacao): void {
    this.camundaService.deleteInstance(solicitacao.id).subscribe(() => {
      this.solicitacoes = this.solicitacoes.filter((s: Solicitacao) => s.id !== solicitacao.id);
      this.modal.titulo = 'Solicitação Deletada';
      this.modal.mensagem = `A solicitação ${solicitacao.idSolicitacao} foi removida com sucesso.`;
      this.modal.cor = 'vermelho';
      this.modal.visivel = true;
    });
  }

  fecharModal(): void {
    this.modal.visivel = false;
  }
}
