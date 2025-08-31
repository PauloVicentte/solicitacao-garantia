import { Routes } from '@angular/router';
import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';
import { AcompanharSolicitacaoComponent } from './pages/acompanhar-solicitacao/acompanhar-solicitacao.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'solicitacao', component: SolicitacaoComponent },
    { path: 'acompanhar-solicitacao', component: AcompanharSolicitacaoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
