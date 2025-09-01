import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from '../../mocks/mock-users';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidePassword = signal(true);
  loginForm;

  modalData = {
    show: false,
    title: '',
    message: '',
    color: 'blue' as 'blue' | 'red'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.hidePassword.update(v => !v);
  }

  openModal(title: string, message: string, color: 'blue' | 'red') {
    this.modalData = { show: true, title, message, color };
  }

  closeModal() {
    this.modalData.show = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      const user = USERS.find(
        u => u.email === email && u.senha === senha
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['/home']);
        }, 1500);
      } else {
        this.openModal('Erro', 'E-mail ou senha inválidos! Tente novamente.', 'red');
      }
    } else {
      this.openModal('Erro', 'Preencha os campos corretamente.', 'red');
    }
  }
}
