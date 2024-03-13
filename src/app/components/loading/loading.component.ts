import { AsyncPipe } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  store = inject(Store);

  loading$ = this.store.pipe( select(isLoadingSelector) );

  constructor() {
  }

}