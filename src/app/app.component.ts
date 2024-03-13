import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { SearchComponent } from './components/search/search.component';
import { Store } from '@ngrx/store';
import * as HeroesActions from './store/actions'
import { AppStateInterface } from './models/appState';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<AppStateInterface>){ }
  
  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '0px' : '650px')

  ngOnInit(){

    this.store.dispatch(HeroesActions.getHeroes());
    
  }


}
