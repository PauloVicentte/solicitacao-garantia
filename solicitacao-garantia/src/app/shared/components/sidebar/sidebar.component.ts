import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpen = true;
  darkMode = false;
  user = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(private router: Router) { }

  ngOnInit() {
    // Carregar preferência de Dark Mode
    if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    }
  }


  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.removeItem('user');
    // Redireciona e substitui toda a navegação anterior
    this.router.navigateByUrl('/login', { replaceUrl: true }).then(() => {
      // opcional: força recarregar a página
      window.location.href = '/login';
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true'); // salva preferência
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('darkMode');
    }
  }
}
