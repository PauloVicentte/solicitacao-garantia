import { Component } from '@angular/core';
import { AppInputComponent } from '../app-input/app-input.component';

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

}
