import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Hero } from '../../interfaces/hero';
import { Store, select } from '@ngrx/store';
import * as HeroesActions from '../../store/actions';
import { menuHiddenSelector } from '../../store/selectors';
import { AppStateInterface } from '../../interfaces/appState';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-hero-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardContent, MatCardTitle, MatError, MatFormField, MatLabel,
            MatButton, NgIf, MatInputModule],
  templateUrl: './hero-add.component.html',
  styleUrl: './hero-add.component.scss'
})
export class HeroAddComponent {

  private destroy$ = new Subject<void>();

  hidden = true;
  formFieldWidth = "1%";
  fontSize = "0rem";

  heroForm = this.fb.group({
    name: ['', Validators.required],
    intelligence: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    strength: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    speed: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    durability: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    power: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    combat: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
  });

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) {}

   ngOnInit():void {
    
      this.store.pipe( 
                      select(menuHiddenSelector),
                      takeUntil(this.destroy$) )
                        .subscribe(value =>{
                                              this.hidden = value;
                                              this.formFieldWidth = this.hidden ? "1%" : "48%";
                                              this.fontSize = this.hidden ? "0rem" : "1.5rem";
                        })

   }

   onAddHero(hero:Partial<Hero>):void {

      this.store.dispatch(HeroesActions.addHero({hero: hero}));
      this.store.dispatch(HeroesActions.changeMenuToggle());

   }



   onSubmit():void {
    console.log(this.heroForm);
    if (this.heroForm.valid) {
      
      const f = this.heroForm.value;
      const hero: object = {
        name: f.name,
        powerstats: {
                intelligence: f.intelligence,
                strength: f.strength,
                speed: f.speed,
                durability: f.durability,
                power: f.power,
                combat: f.combat
        }
      };

      this.onAddHero(hero);
      
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
