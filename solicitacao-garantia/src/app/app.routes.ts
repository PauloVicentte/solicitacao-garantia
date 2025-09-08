import { Routes } from '@angular/router';
import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';
import { AcompanharSolicitacaoComponent } from './pages/acompanhar-solicitacao/acompanhar-solicitacao.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    { path: 'solicitacao', component: SolicitacaoComponent, canActivate: [AuthGuard] },
    { path: 'acompanhar-solicitacao', component: AcompanharSolicitacaoComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
