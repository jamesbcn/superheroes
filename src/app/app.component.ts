import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, LoadingComponent],
  template: `
    <app-navbar></app-navbar>
    <app-sidebar></app-sidebar>
    <router-outlet></router-outlet>

    <app-loading></app-loading>
  `,
})
export class AppComponent {
  title = 'superheroes';
}
