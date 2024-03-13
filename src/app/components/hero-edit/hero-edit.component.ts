import { Component, Inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
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

  heroForm = this.fb.group({
    name: ['', Validators.required],
    intelligence: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    strength: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    speed: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    durability: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    power: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    combat: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
  });

  constructor(
    private store: Store<AppStateInterface>, private fb: FormBuilder,
    public dialogRef: MatDialogRef<HeroEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void{
    console.log(this.data)

    this.store.dispatch(HeroesActions.updateHero({hero: this.data}));
    this.close();
  }
  

}
