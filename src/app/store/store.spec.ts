import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState, reducers } from './reducers';
import * as HeroesActions from './actions';
import * as HeroesSelectors from './selectors';
import { Hero } from '../models/hero';

describe('NgRx Store', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should dispatch getHeroes action', () => {
    const action = HeroesActions.getHeroes();
    spyOn(store, 'dispatch');
    store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should select heroes from store correctly', fakeAsync(() => {
    const heroes: Hero[] = [
      { id: '1', name: 'Superman', powerstats: { intelligence: 99, strength: 99, speed: 99, durability: 99, power: 99, combat: 99 } },
      { id: '2', name: 'Batman', powerstats: { intelligence: 100, strength: 100, speed: 100, durability: 100, power: 100, combat: 100 } }
    ];

    store.overrideSelector(HeroesSelectors.heroesSelector, heroes);

    let selectedHeroes: Hero[] | undefined;

    store.select(HeroesSelectors.heroesSelector).subscribe(heroesFromSelector => {
      selectedHeroes = heroesFromSelector;
    });

    tick();

    expect(selectedHeroes).toEqual(heroes);
  }));


  it('should handle the getHeroesSuccess action correctly', () => {
    const heroes = [
      { id: '1', name: 'Superman', powerstats: { intelligence: 99, strength: 99, speed: 99, durability: 99, power: 99, combat: 99 } },
      { id: '2', name: 'Batman', powerstats: { intelligence: 100, strength: 100, speed: 100, durability: 100, power: 100, combat: 100 } }
    ];

    const action = { type: '[Heroes] Get Heroes Success', heroes };

    const newState = reducers(initialState, action);

    expect(newState).toEqual({ ...initialState, heroes });
  });


  


  

  


  


});
