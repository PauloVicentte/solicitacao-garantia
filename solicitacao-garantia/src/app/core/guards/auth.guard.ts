import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    return this.verificarUsuario();
  }

  verificarUsuario(): boolean {
    if (typeof window === 'undefined') return false;

    const usuario = localStorage.getItem('user');
    if (usuario) return true;

    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
}
