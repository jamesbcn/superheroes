import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule],
  template: `
    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
          <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container>
    
    <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-sidebar [collapsed]="collapsed()"></app-sidebar>
    </mat-sidenav>
        
    <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
    </mat-sidenav-content>

    </mat-sidenav-container>

    <app-loading></app-loading>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  collapsed = signal(true);

  sidenavWidth = computed(() => this.collapsed() ? '0px' : '650px')
}
