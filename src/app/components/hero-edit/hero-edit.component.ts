import { Component, Inject } from '@angular/core';
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
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatButtonModule, FormsModule, MatDialogContent,MatDialogTitle, MatFormFieldModule, MatInputModule],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.scss'
})
export class HeroEditComponent {

  constructor(
    public dialogRef: MatDialogRef<HeroEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void{
    console.log(this.data)
  }
  

}
