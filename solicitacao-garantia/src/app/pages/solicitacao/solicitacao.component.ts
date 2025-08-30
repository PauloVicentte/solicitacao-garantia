import { Component } from '@angular/core';
import { FormularioClienteComponent } from "../../shared/components/formulario-cliente/formulario-cliente.component";
import { FormularioAparelhoComponent } from "../../shared/components/formulario-aparelho/formulario-aparelho.component";
import { AppButtonComponent } from "../../shared/components/app-button/app-button.component";

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    FormularioClienteComponent,
    FormularioAparelhoComponent,
    AppButtonComponent
],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.scss'
})
export class SolicitacaoComponent {

}
