import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { Store, select } from '@ngrx/store';
import * as HeroesActions from './store/actions';
import { AppStateInterface } from './models/appState';
import { menuHiddenSelector } from './store/selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  collapsed = false;
  sidenavWidth = '0px';

  constructor(private store: Store<AppStateInterface>){ }

  ngOnInit(){

    this.store.dispatch(HeroesActions.getHeroes());

    this.store.pipe( select(menuHiddenSelector) ).subscribe(value =>{
      this.collapsed = value;
      this.sidenavWidth =  this.collapsed ? '0px' : '650px';
    })
    
  }

  toggleMenu(){
    this.store.dispatch(HeroesActions.changeMenuToggle());
  }


}
