import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import * as HeroesActions from './actions';
import { Hero } from '../interfaces/hero';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HeroesEffects {

  constructor(private actions$: Actions, private heroesService: HeroesService, private toastr: ToastrService) { }

  getHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.getHeroes),
      exhaustMap(() => {
        return this.heroesService.getHeroes().pipe(

          map((heroes: Hero[] | undefined) => {

            if(heroes === undefined){
              throw new Error("Unexpected state: getHeroes service returned undefined");
            }

            this.toastr.success('¡Héroes listos!');
            return HeroesActions.getHeroesSuccess({ heroes })
          }),

          catchError((error) => {
            console.error(error)
            this.toastr.error(`ERROR: ${error.message}`);
            return of(HeroesActions.getHeroesFailure({ error: error.message }))
          }
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
          map((updatedHero: Hero | undefined) => {

          if(updatedHero === undefined){
              throw new Error("Unexpected state: 'addHero' service returned undefined");
          }

          this.toastr.success('Hero added successfully!');

          return HeroesActions.addHeroSuccess({ hero: updatedHero })  
          }),
          catchError((error) => {
            console.error(error)
            this.toastr.error(`ERROR: ${error.message}`);
            return of(HeroesActions.getHeroesFailure({ error: error.message }))
          })
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
          map((updatedHero: Hero | undefined) => {

            if(updatedHero === undefined){
              throw new Error("Unexpected state: 'updatedHero' service returned undefined");
            }

            this.toastr.success('¡Heroe actualizado con éxito!');

            return HeroesActions.updateHeroSuccess({ hero: updatedHero });
          }),
          catchError((error) => {
            console.error(error)
            this.toastr.error(`ERROR: ${error.message}`);
            return of(HeroesActions.getHeroesFailure({ error: error.message }))
          })
        );
      })
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.deleteHero),
      exhaustMap((action) => {
        return this.heroesService.deleteHero(action.id).pipe(
          map(() => {
            this.toastr.success('¡Heroe borrado con éxito!');
            return HeroesActions.deleteHeroSuccess({ id: action.id  })
          }),
          catchError((error) => {
            console.error(error)
            this.toastr.error(`ERROR: ${error.message}`);
            return of(HeroesActions.getHeroesFailure({ error: error.message }))
          })
        );
      })
    )
  );


}