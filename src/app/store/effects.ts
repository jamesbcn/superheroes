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

          map((heroes: Hero[] | undefined) => HeroesActions.getHeroesSuccess({ heroes })),

          catchError((error) =>
            of(HeroesActions.getHeroesFailure({ error: error.message }))
          )

        );
      })
    )
  );

  addHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.addHero),
      exhaustMap((action) => {
        const hero: Partial<Hero> = action.hero;
        return this.heroesService.addHero(hero).pipe(
          map((updatedHero: Hero | undefined) => HeroesActions.addHeroSuccess({ hero: updatedHero })),
          catchError((error) =>
            of(HeroesActions.getHeroesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  updateHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.updateHero),
      exhaustMap((action) => {
        const hero: Hero = action.hero;
        return this.heroesService.updateHero(hero).pipe(
          map((updatedHero: Hero | undefined) => HeroesActions.updateHeroSuccess({ hero: updatedHero })),
          catchError((error) =>
            of(HeroesActions.getHeroesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.deleteHero),
      exhaustMap((action) => {
        return this.heroesService.deleteHero(action.id).pipe(
          map((id: string) => HeroesActions.deleteHeroSuccess({ id: action.id  })),
          catchError((error) =>
            of(HeroesActions.deleteHeroFailure({ error: error.message }))
          )
        );
      })
    )
  );


  constructor(private actions$: Actions, private heroesService: HeroesService) { }
}