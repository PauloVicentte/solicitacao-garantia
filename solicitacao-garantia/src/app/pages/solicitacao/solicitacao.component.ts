import { Component, OnInit } from '@angular/core';
import { DadosAparelho } from '../../models/aparelho.model';
import { SolicitacaoService } from '../../service/solicitacao.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { obterUsuario } from '../../helpers/user';
import { validarDataCompra, validarNotaFiscal } from '../../helpers/validacoes';
import { MARCAS_MODELOS } from '../../models/marcas.model';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {
  solicitacaoForm!: ReturnType<FormBuilder['group']>;
  user: any = obterUsuario();
  modelosDisponiveis: string[] = [];
  showModal = false;
  modalTitle = '';
  modalMessage = '';

  constructor(private fb: FormBuilder, private solicitacaoService: SolicitacaoService) { }

  ngOnInit(): void {
    this.construirForm();
    this.solicitacaoForm.markAllAsTouched();
  }

  private construirForm() {
    this.solicitacaoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      notaFiscal: ['', [Validators.required, validarNotaFiscal]],
      dataCompra: ['', [Validators.required, validarDataCompra]],
      tipoDefeito: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  atualizarModelos() {
    const marca = this.solicitacaoForm.get('marca')?.value;
    this.modelosDisponiveis = MARCAS_MODELOS[marca] || [];
    this.solicitacaoForm.get('modelo')?.setValue('');
  }

  campoInvalido(campo: string) {
    const control = this.solicitacaoForm.get(campo);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  abrirModal(titulo: string, mensagem: string) {
    this.modalTitle = titulo;
    this.modalMessage = mensagem;
    this.showModal = true;
  }

  enviarSolicitacao() {
    if (this.solicitacaoForm.invalid) {
      this.solicitacaoForm.markAllAsTouched();
      return;
    }

    const aparelho: DadosAparelho = this.solicitacaoForm.value;

    this.solicitacaoService.enviarSolicitacao(this.user, aparelho)
      .subscribe({
        next: () => this.abrirModal('Sucesso!', 'Sua solicitação foi enviada com sucesso.'),
        error: () => this.abrirModal('Erro!', 'Não foi possível enviar a solicitação.')
      });

    this.solicitacaoForm.reset();
    this.modelosDisponiveis = [];
  }
}
