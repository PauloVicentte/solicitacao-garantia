import { Routes } from '@angular/router';
import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';
import { AcompanharSolicitacaoComponent } from './pages/acompanhar-solicitacao/acompanhar-solicitacao.component';

export const routes: Routes = [
    { path: 'solicitacao', component: SolicitacaoComponent },
    { path: 'acompanhar-solicitacao', component: AcompanharSolicitacaoComponent },
    { path: '', redirectTo: 'solicitacao', pathMatch: 'full' }
];
