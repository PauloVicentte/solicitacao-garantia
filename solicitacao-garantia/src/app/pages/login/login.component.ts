import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from '../../mocks/mock-users';
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

  modal = {
    visivel: false,
    titulo: '',
    mensagem: '',
    cor: 'azul' as 'azul' | 'vermelho'
  };

  constructor(private fb: FormBuilder, private router: Router) { }

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
    const abrirErro = (mensagem: string) => this.abrirModal('Erro', mensagem, 'vermelho');

    if (!this.formularioLogin.valid) {
      abrirErro('Preencha os campos corretamente.');
      return;
    }

    const { email, senha } = this.formularioLogin.value;
    const usuario = USERS.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      abrirErro('E-mail ou senha inválidos! Tente novamente.');
      return;
    }
    localStorage.setItem('user', JSON.stringify(usuario));

    setTimeout(() => {
      this.fecharModal();
      this.router.navigate(['/home']);
    }, 1500);
  }

}
