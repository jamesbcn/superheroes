import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule],
  template: `
    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
          <mat-icon>menu</mat-icon>
      </button>
      sideNav is Collapsed: {{collapsed()}}
    </mat-toolbar>
    <mat-sidenav-container>
    
    <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-sidebar [collapsed]="collapsed()"></app-sidebar>
    </mat-sidenav>
        
    <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
    </mat-sidenav-content>

    </mat-sidenav-container>

    <app-sidebar></app-sidebar>
    

    <app-loading></app-loading>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '650px')
}
