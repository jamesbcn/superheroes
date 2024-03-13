import { createAction, props } from "@ngrx/store";
import { Hero } from "../models/hero";

export const getHeroes = createAction('[Heroes] Get Heroes');

export const getHeroesSuccess = createAction('[Heroes] Get Heroes Success', props<{heroes: Hero[] | undefined}>() );

export const getHeroesFailure = createAction('[Heroes] Get Heroes Failure', props<{error: string}>());