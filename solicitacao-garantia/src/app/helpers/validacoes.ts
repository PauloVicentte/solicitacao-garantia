import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarDataCompra(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const dataSelecionada = new Date(control.value);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return dataSelecionada >= hoje ? { dataInvalida: true } : null;
}

export function validarNotaFiscal(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const apenasNumeros = /^[0-9]+$/;

  return apenasNumeros.test(control.value) ? null : { notaFiscalInvalida: true };
}

export function validarEmail(control: AbstractControl) {
  const email = control.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : { emailInvalido: true };
}

export function validarSenha(control: AbstractControl) {
  const senha = control.value;
  return senha && senha.length >= 6 ? null : { senhaCurta: true };
}