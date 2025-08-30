import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolicitacaoComponent } from "./pages/solicitacao/solicitacao.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SolicitacaoComponent,
    NavbarComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'solicitacao-garantia';
}
