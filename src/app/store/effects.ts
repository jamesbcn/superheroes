import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import * as HeroesActions from './actions';
import { Hero } from '../models/hero';

@Injectable()
export class HeroesEffects {
  getHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.getHeroes),
      exhaustMap(() => {
        return this.heroesService.getHeroes().pipe(

          map((heroes: Hero[] |undefined) => HeroesActions.getHeroesSuccess({heroes})),

          catchError((error) =>
            of(HeroesActions.getHeroesFailure({ error: error.message }))
          )
          
        );
      })
    )
  );

  constructor(private actions$: Actions, private heroesService: HeroesService) {}
}