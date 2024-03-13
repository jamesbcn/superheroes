import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../models/appState";


export const selectFeature = (state: AppStateInterface) => state.heroes; 

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);

export const menuHiddenSelector = createSelector(selectFeature, (state) => state.menuHidden);

export const heroesSelector = createSelector(selectFeature, (state) => state.heroes);

export const errorSelector = createSelector(selectFeature, (state) => state.error);
