import { Component, Input, inject, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Hero } from '../../models/hero';
import { Store } from '@ngrx/store';
import * as HeroesActions from '../../store/actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardContent, MatCardTitle, MatError, MatFormField, MatLabel, MatSelect, 
            MatButton, MatOption, NgIf, MatInputModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val)
  }

  heroForm: FormGroup;
  name: any;
  intelligence: any;
  image: any;
  combat: any;
  power: any;
  durability: any;
  strength: any;
  speed: any;
  imageSizes = ['XS', 'SM', 'MD', 'LG'];
  urlRegEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private store: Store, private fb: FormBuilder) {

    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      // image: ['', [Validators.required, Validators.pattern(this.urlRegEx)]],
      // imageSize: ['', Validators.required],
      intelligence: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      strength: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      speed: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      durability: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      power: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      combat: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    });

   }

   onAddHero(hero:Partial<Hero>) {

      this.store.dispatch(HeroesActions.addHero({hero: hero}));

   }



   onSubmit() {
    console.log(this.heroForm);
    if (this.heroForm.valid) {
      
      const f = this.heroForm.value;
      const hero = {
        name: f.name,
        powerstats: {
                intelligence: f.intelligence,
                strength: f.strength,
                speed: f.speed,
                durability: f.durability,
                power: f.power,
                combat: f.combat
        },
        images: {
          xs: (f.imageSize === 'xs') ? f.image : '../../../assets/img/avatar-xs.png',
          sm: "",
          md: "",
          lg: (f.imageSize === 'lg') ? f.image : '../../../assets/img/avatar-xs.png'
        }
      };

      this.onAddHero(hero);

      this.heroForm.reset();

      this.sideNavCollapsed.set(true);
      
    } else {
      // Toaster message!
    }
  }

}
