import { Hero } from './hero';

export interface HeroesState {
    isLoading: boolean;
    heroes: Hero[] | undefined;
    error: string | null;
}