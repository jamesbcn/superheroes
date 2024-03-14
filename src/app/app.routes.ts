import { Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HeroListComponent},
  { path: '404', component: NotFoundComponent },
  {path: '**', redirectTo: '404', pathMatch: 'full'},
];
