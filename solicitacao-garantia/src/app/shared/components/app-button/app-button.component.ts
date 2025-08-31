import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss'
})
export class AppButtonComponent {
  @Input() label = 'Enviar';
  @Input() customClass = '';
  @Output() clickButton = new EventEmitter<void>();

  onClick() {
    this.clickButton.emit();
  }
}
