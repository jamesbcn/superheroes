import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Hero } from "../models/hero"
import { inject } from "@angular/core";
import { HeroesService } from "../services/heroes.service";

export type HeroesFilter = "all" | "new";

type HeroesState = {
    heroes: Hero[];
    loading: boolean;
    filter: HeroesFilter
}

const initialState: HeroesState = {

    heroes: [],
    loading: false,
    filter: "all"

}

export const HeroesStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods(
        (store, heroesService = inject(HeroesService)) => ({
            async loadAll() {
                patchState(store, {loading: true});

                const heroes = await heroesService.getHeroes();

                patchState(store, {heroes, loading: false});

            },
            async addHero(profile:Partial<Hero>) {

                const hero = await heroesService.addHero(profile);

                patchState(store, (state) => ({
                    heroes: [...state.heroes, hero]
                }));

            },
            async deleteHero(id:string) {

                await heroesService.deleteHero(id);

                patchState(store, (state) => ({
                    heroes: state.heroes.filter(hero => hero.id !== id)
                }));

            },

            async updateHero(id:string, updatedHero:Hero) {

                await heroesService.updateHero(id, updatedHero);

                patchState(store, (state) => ({
                    heroes: state.heroes.map(h => h.id == id ? h = updatedHero : h)
                }));

            }

        })
    )
)