import {Component, Inject} from '@angular/core';
import {
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
import { AppStateInterface } from '../../interfaces/appState';
import { Store } from '@ngrx/store';
import * as HeroesActions from '../../store/actions';

export interface DeleteData {
  id: string;
  name: string;
}

@Component({
  selector: 'hero-delete',
  templateUrl: './hero-delete.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class HeroDeleteComponent {
  constructor(
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<HeroDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteData,
  ) {}

  confirm(): void {
    this.store.dispatch(HeroesActions.deleteHero({ id: this.data.id }));
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}