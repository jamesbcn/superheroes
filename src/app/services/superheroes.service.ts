import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay  } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  private API_URL = 'http://localhost:3001/';

  private _heroesSubject = new BehaviorSubject<Hero[]>([]);
  heroes$: Observable<Hero[]> = this._heroesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getHeroes(filter?: string): Observable<Hero[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = '';
    if (filter) {
      params = `?name=${filter}`;
    }

    return this.http.get<Hero[]>(`${this.API_URL}heroes${params}`, { headers })
      .pipe(
        tap(heroes => this._heroesSubject.next(heroes)),
            catchError(error => {
              const errorMessage = this.handleErrorForToaster(error);
              // this.toastService.showError(errorMessage);
              return throwError(() => new Error(error)); 
            })  
      );
  }

  getHero(id: number): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Hero>(`${this.API_URL}heroes/${id}`, { headers })
      .pipe(
        catchError(error => {
          const errorMessage = this.handleErrorForToaster(error);
          // this.toastService.showError(errorMessage);
          return throwError(() => new Error(error)); 
        })
      );
  }

  createHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<Hero>(`${this.API_URL}heroes`, hero, { headers })
      .pipe(
        tap(createdHero => {
          const currentHeroes = this._heroesSubject.getValue();
          this._heroesSubject.next([...currentHeroes, createdHero]);
        }),
        catchError(error => {
          const errorMessage = this.handleErrorForToaster(error);
          // this.toastService.showError(errorMessage);
          return throwError(() => new Error(error)); 
        })
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<Hero>(`${this.API_URL}heroes/${hero.id}`, hero, { headers })
      .pipe(
        tap(updatedHero => {
          const currentHeroes = this._heroesSubject.getValue();
          const updatedHeroes = currentHeroes.map(h => h.id === updatedHero.id ? updatedHero : h);
          this._heroesSubject.next(updatedHeroes);
        }),
        catchError(error => {
          const errorMessage = this.handleErrorForToaster(error);
          // this.toastService.showError(errorMessage);
          return throwError(() => new Error(error)); 
        })
      );
  }

  deleteHero(id: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.API_URL}heroes/${id}`, { headers })
      .pipe(
        tap(() => {
          const currentHeroes = this._heroesSubject.getValue();
          const filteredHeroes = currentHeroes.filter(h => h.id !== id);
          this._heroesSubject.next(filteredHeroes);
        }),
        catchError(error => {
          const errorMessage = this.handleErrorForToaster(error);
          // this.toastService.showError(errorMessage);
          return throwError(() => new Error(error)); 
        })
      );
  }

  private handleErrorForToaster(error: any): string {

    if (error.error && error.error.message) {
      return error.error.message;
    } else {
      return 'Ocurrió un error inesperado.';
    }
  }
}
