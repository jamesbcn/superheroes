import { Component, Inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Hero } from '../../models/hero';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState';
import * as HeroesActions from '../../store/actions';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [MatDialogActions, NgIf, MatDialogClose, MatButtonModule, FormsModule, MatDialogContent,MatDialogTitle, MatFormFieldModule, MatInputModule, MatDialogTitle,
  MatDialogContent, MatCard, MatCardContent, MatCardTitle, ReactiveFormsModule ],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.scss'
})
export class HeroEditComponent {

  constructor(
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<HeroEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void{
    this.store.dispatch(HeroesActions.updateHero({hero: this.data}));
    this.close();
  }
  

}
