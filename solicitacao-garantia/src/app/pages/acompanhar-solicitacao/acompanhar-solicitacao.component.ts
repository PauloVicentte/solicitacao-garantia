import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';

interface Solicitacao {
  id: string;
  nome: string;
  data: string;
  status: 'Em análise' | 'Aprovado' | 'Negado';
  cliente: {
    nome: string;
    cpf: string;
    celular: string;
  };
}

@Component({
  selector: 'app-acompanhar-solicitacao',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './acompanhar-solicitacao.component.html',
  styleUrls: ['./acompanhar-solicitacao.component.scss']
})
export class AcompanharSolicitacaoComponent {
  solicitacoes: Solicitacao[] = [];
  user = JSON.parse(localStorage.getItem('user') || 'null');
  modalAberto: boolean = false;
  clienteSelecionado: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    this.http.get<any[]>('/engine-rest/history/process-instance')
      .subscribe(instances => {
        instances.forEach(pi => {
          this.http.get<any[]>(`/engine-rest/history/variable-instance?processInstanceId=${pi.id}&variableName=status`)
            .subscribe(vars => {
              const status = vars[0]?.value || 'Em análise';
              this.solicitacoes.push({
                id: pi.id,
                nome: this.user.nome,
                data: pi.startTime,
                status,
                cliente: { nome: '', cpf: '', celular: '' }
              });
            });
        });
      });
  }

  verDetalhes(solicitacao: Solicitacao) {
    this.clienteSelecionado = solicitacao.cliente;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.clienteSelecionado = null;
  }
}
