import { Hero } from './hero';

export interface HeroesState {
    isLoading: boolean;
    menuHidden: boolean;
    heroes: Hero[];
    error: string | null;
}