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
import { HeroesService } from './services/heroes.service';
import { HeroesStore } from './store/heroes.store';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, LoadingComponent, MatToolbarModule, MatButtonModule, MatIconModule, 
    MatSidenavModule, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  store = inject(HeroesStore)
  
  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '0px' : '650px')

  ngOnInit(){
    this.loadHeroes()
          .then(() => console.log("Heroes están listados!", this.store.heroes()))
  }

  async loadHeroes() {
    await this.store.loadAll();
  }
}
