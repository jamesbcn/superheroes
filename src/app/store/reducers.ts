import { createReducer, on } from '@ngrx/store';
import {HeroesState} from '../models/heroesState';
import * as HeroesActions from './actions'


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
    }))
  );