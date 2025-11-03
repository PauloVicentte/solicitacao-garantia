import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../service/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { validarEmail, validarSenha } from '../../helpers/validacoes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  esconderSenha = signal(true);
  formularioLogin!: ReturnType<FormBuilder['group']>;
  modal = { visivel: false, titulo: '', mensagem: '', cor: 'azul' as 'azul' | 'vermelho' };

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit() {
    this.criarFormulario();
  }

  private criarFormulario() {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, validarEmail]],
      senha: ['', [Validators.required, validarSenha]]
    });
  }

  alternarSenha() {
    this.esconderSenha.update(v => !v);
  }

  abrirModal(titulo: string, mensagem: string, cor: 'azul' | 'vermelho') {
    this.modal = { visivel: true, titulo, mensagem, cor };
  }

  fecharModal() {
    this.modal.visivel = false;
  }

  enviarLogin() {
    const abrirErro = (msg: string) => this.abrirModal('Erro', msg, 'vermelho');

    if (!this.formularioLogin.valid) {
      abrirErro('Preencha os campos corretamente.');
      return;
    }

    const { email, senha } = this.formularioLogin.value as LoginRequest;

    this.authService.login({ email, senha }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => abrirErro('E-mail ou senha inválidos!')
    });
  }
}
