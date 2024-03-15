import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroAddComponent } from './components/hero-add/hero-add.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { Store, select } from '@ngrx/store';
import * as HeroesActions from './store/actions'
import { AppStateInterface } from './interfaces/appState';
import { menuHiddenSelector } from './store/selectors';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeroAddComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  menuHidden = false;
  sidenavWidth = '0px';

  constructor(private store: Store<AppStateInterface>){ }

  ngOnInit(): void {

    this.store.dispatch(HeroesActions.getHeroes());

    this.store.pipe( 
                    select(menuHiddenSelector),
                    takeUntil(this.destroy$) )
      .subscribe(value =>{
        this.menuHidden = value;
        this.sidenavWidth =  this.menuHidden ? '0px' : '650px';
      })
    
  }

  toggleMenu(): void {
    this.store.dispatch(HeroesActions.changeMenuToggle());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
