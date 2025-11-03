import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(): boolean {
    const estaAutenticado = this.authService.isAutenticado();

    if (estaAutenticado) return true;

    if (typeof window !== 'undefined') {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
