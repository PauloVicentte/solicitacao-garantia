import { CommonModule } from '@angular/common';
import { Component, HostListener, computed } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isMobile: boolean = false;
  isOpen: boolean = false;
  darkMode = false;
  user = computed(() => this.authService.user$());

  constructor(private router: Router, private authService: AuthService) {
    this.checkScreenWidth();
  }

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  @HostListener('window:resize')
  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  checkMobile(): void {
  this.isMobile = window.innerWidth <= 768;
  if (!this.isMobile) {
    this.isOpen = true;
  }
}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', String(this.darkMode));
  }
}
