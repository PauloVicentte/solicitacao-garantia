import { Component } from '@angular/core';
import { FormularioClienteComponent } from "../../shared/components/formulario-cliente/formulario-cliente.component";
import { FormularioAparelhoComponent } from "../../shared/components/formulario-aparelho/formulario-aparelho.component";
import { AppButtonComponent } from "../../shared/components/app-button/app-button.component";
import { DadosCliente } from '../../models/cliente.model';
import { DadosAparelho } from '../../models/aparelho.model';
import { SolicitacaoService } from '../../service/solicitacao.service';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    FormularioClienteComponent,
    FormularioAparelhoComponent,
    AppButtonComponent,

  ],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.scss'
})
export class SolicitacaoComponent {
  cliente: DadosCliente = new DadosCliente();
  aparelho: DadosAparelho = new DadosAparelho();

  constructor(private solicitacaoService: SolicitacaoService) {}

  enviarSolicitacao() {
    this.solicitacaoService.enviarSolicitacao(this.cliente, this.aparelho)
      .subscribe({
        next: res => console.log('Solicitação enviada com sucesso', res),
        error: err => console.error('Erro ao enviar solicitação', err)
      });
  }
}
