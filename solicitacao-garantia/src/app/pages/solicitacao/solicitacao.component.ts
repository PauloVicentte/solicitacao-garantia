import { Component } from '@angular/core';
import { DadosAparelho } from '../../models/aparelho.model';
import { SolicitacaoService } from '../../service/solicitacao.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent {
  solicitacaoForm;

  user = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService
  ) {
    this.solicitacaoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      notaFiscal: ['', Validators.required],
      dataCompra: ['', Validators.required],
      tipoDefeito: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  enviarSolicitacao() {
    if (this.solicitacaoForm.invalid) {
      console.warn('Formulário inválido');
      return;
    }

    const aparelho: DadosAparelho = this.solicitacaoForm.value as DadosAparelho;

    this.solicitacaoService.enviarSolicitacao(this.user, aparelho)
      .subscribe({
        next: res => console.log('Solicitação enviada com sucesso', res),
        error: err => console.error('Erro ao enviar solicitação', err)
      });
  }
}
