import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  celular: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:7160/api/auth/login';
  user$: WritableSignal<User | null> = signal<User | null>(this.getUserFromStorage());
  token$: WritableSignal<string | null> = signal<string | null>(this.getTokenFromStorage());

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest) {
    return this.http.post<{ token: string; user: User }>(this.apiUrl, credentials).pipe(
      tap(({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user$.set(user);
        this.token$.set(token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user$.set(null);
    this.token$.set(null);
  }

  private getUserFromStorage(): User | null {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): User | null {
    return this.user$();
  }

  isAutenticado(): boolean {
    return !!this.token$();
  }
}
