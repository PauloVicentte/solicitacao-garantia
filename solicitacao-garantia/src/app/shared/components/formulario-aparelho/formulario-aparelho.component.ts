import { Component } from '@angular/core';
import { AppInputComponent } from '../app-input/app-input.component';

@Component({
  selector: 'app-formulario-aparelho',
  standalone: true,
  imports: [
    AppInputComponent,
  ],
  templateUrl: './formulario-aparelho.component.html',
  styleUrl: './formulario-aparelho.component.scss'
})
export class FormularioAparelhoComponent {

}
