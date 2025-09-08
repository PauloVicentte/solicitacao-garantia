import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        this.router.navigate(['/home'], { replaceUrl: true });
        return false;
      }
      return true;
    }
    return false;
  }
}
