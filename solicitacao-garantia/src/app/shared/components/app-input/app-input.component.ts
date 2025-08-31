import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss'
})
export class AppInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
