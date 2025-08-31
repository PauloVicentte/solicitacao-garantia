import { Component } from '@angular/core';
import { AppInputComponent } from '../app-input/app-input.component';
import { DadosCliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    AppInputComponent,
  ],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.scss'
})
export class FormularioClienteComponent {
  cliente: DadosCliente;

  constructor() {
    this.cliente = new DadosCliente();
  }
}
