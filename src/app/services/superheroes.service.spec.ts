import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperheroesService } from './superheroes.service';
import { Hero } from '../models/hero';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroesService],
    });
    service = TestBed.inject(SuperheroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch heroes filtered by name', () => {
    const filter = 'Super';
    service.getHeroes(filter).subscribe((heroes: Hero[]) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toContain(filter);
    });
    httpMock.expectOne('http://localhost:3001/heroes?name=Super').flush([
      { id: 1, name: 'Super Man' }
    ]);
  });

  it('should fetch a specific hero by ID', () => {
    const heroId = 42;
    service.getHero(heroId).subscribe((hero: Hero) => {
      expect(hero.id).toBe(heroId);
      expect(hero.name).toBe('Mock Hero');
    });
    httpMock.expectOne(`http://localhost:3001/heroes/${heroId}`).flush({
      id: heroId,
      name: 'Mock Hero'
    });
  });
});
