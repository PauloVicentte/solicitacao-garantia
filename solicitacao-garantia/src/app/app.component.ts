import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolicitacaoComponent } from "./pages/solicitacao/solicitacao.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SolicitacaoComponent,
    SidebarComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'solicitacao-garantia';
}
