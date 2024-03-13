import { createReducer, on } from '@ngrx/store';
import {HeroesState} from '../models/heroesState';
import * as HeroesActions from './actions'
import { Hero } from '../models/hero';


export const initialState: HeroesState = {
    isLoading: false,
    heroes: [],
    error: null,
}


export const reducers = createReducer(

    initialState,

    on(HeroesActions.getHeroes, (state) => ({ ...state, isLoading: true })),
    on(HeroesActions.getHeroesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      heroes: action.heroes,
    })),
    on(HeroesActions.getHeroesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),

    on(HeroesActions.addHero, (state) => ({ ...state, isLoading: true })),
    on(HeroesActions.addHeroSuccess, (state, action) => {
      const updatedHeroes = state.heroes ? [...state.heroes, action.hero] : [action.hero];
      return {
        ...state,
        isLoading: false,
        heroes: updatedHeroes as Hero[]
      };
    }),
    on(HeroesActions.addHeroFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),


    on(HeroesActions.updateHero, (state) => ({ ...state, isLoading: true })),
    on(HeroesActions.updateHeroSuccess, (state, action) => {
      const updatedHeroes = state.heroes?.map((hero) =>
        hero.id === action.hero?.id ? action.hero : hero
      );
      return {
        ...state,
        isLoading: false,
        heroes: updatedHeroes
      };
    }),
    on(HeroesActions.updateHeroFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),

    on(HeroesActions.deleteHero, (state) => ({ ...state, isLoading: true })),
    on(HeroesActions.deleteHeroSuccess, (state, action) => {
      const updatedHeroes = state.heroes?.filter((hero) => hero.id !== action.id);
      return {
        ...state,
        isLoading: false,
        heroes: updatedHeroes
      };
    }),
    on(HeroesActions.deleteHeroFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))


  );