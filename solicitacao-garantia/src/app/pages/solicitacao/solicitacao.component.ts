import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitacaoService } from '../../service/solicitacao.service';
import { AuthService } from '../../service/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { validarDataCompra, validarNotaFiscal } from '../../helpers/validacoes';
import { MARCAS_MODELOS } from '../../models/marcas.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DadosAparelho } from '../../models/aparelho.model';
import { User } from '../../service/auth.service';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ModalComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {
  solicitacaoForm!: FormGroup;
  user = computed(() => this.authService.user$());
  modelosDisponiveis: string[] = [];
  showModal = false;
  modalTitle = '';
  modalMessage = '';

  constructor(
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

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

  campoInvalido(campo: string): boolean {
    const control = this.solicitacaoForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  atualizarModelos() {
    const marca = this.solicitacaoForm.get('marca')?.value;
    this.modelosDisponiveis = MARCAS_MODELOS[marca] || [];
    this.solicitacaoForm.get('modelo')?.setValue('');
  }

  abrirModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  enviarSolicitacao() {
    if (this.solicitacaoForm.invalid) {
      this.solicitacaoForm.markAllAsTouched();
      return;
    }

    const aparelho: DadosAparelho = this.solicitacaoForm.value;
    const usuario: User | null = this.user();

    if (!usuario) {
      this.abrirModal('Erro!', 'Usuário não encontrado. Faça login novamente.');
      return;
    }

    this.solicitacaoService.enviarSolicitacao(usuario, aparelho).subscribe({
      next: () => this.abrirModal('Sucesso!', 'Sua solicitação foi enviada com sucesso.'),
      error: () => this.abrirModal('Erro!', 'Não foi possível enviar a solicitação.')
    });

    this.solicitacaoForm.reset({
      marca: '',
      modelo: '',
      notaFiscal: '',
      dataCompra: '',
      tipoDefeito: '',
      descricao: ''
    });
    this.modelosDisponiveis = [];
  }
}
