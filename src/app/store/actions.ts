import { createAction, props } from "@ngrx/store";
import { Hero } from "../interfaces/hero";

export const getHeroes = createAction('[Heroes] Get Heroes');
export const getHeroesSuccess = createAction('[Heroes] Get Heroes Success', props<{heroes: Hero[]}>() );
export const getHeroesFailure = createAction('[Heroes] Get Heroes Failure', props<{error: string}>());

export const addHero = createAction('[Heroes] Add Hero', props<{hero: Partial<Hero>}>());
export const addHeroSuccess = createAction('[Heroes] Add Hero Success', props<{hero: Hero}>() );
export const addHeroFailure = createAction('[Heroes] Add Hero Failure', props<{error: string}>());

export const updateHero = createAction('[Heroes] Update Hero', props<{hero: Hero}>());
export const updateHeroSuccess = createAction('[Heroes] Update Hero Success', props<{hero: Hero}>() );
export const updateHeroFailure = createAction('[Heroes] Update Hero Failure', props<{error: string}>());

export const deleteHero = createAction('[Heroes] Delete Hero', props<{id: string}>());
export const deleteHeroSuccess = createAction('[Heroes] Delete Hero Success', props<{id: string}>() );
export const deleteHeroFailure = createAction('[Heroes] Delete Hero Failure', props<{error: string}>());

export const changeMenuToggle = createAction('[Heroes] Change Menu Toggle');
export const changeMenuToggleSuccess = createAction('[Heroes] Change Menu Toggle Success', props<{menuHidden: boolean}>() );
export const changeMenuToggleFailure = createAction('[Heroes] Change Menu Toggle Failure', props<{error: string}>());