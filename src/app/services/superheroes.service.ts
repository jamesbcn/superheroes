import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero'; 

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  private API_URL = 'http://localhost:3001/'; 

  constructor(private http: HttpClient) { }

  getHeroes(filter?: string): Observable<Hero[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = '';
    if (filter) {
      params = `?name=${filter}`;
    }

    return this.http.get<Hero[]>(`${this.API_URL}heroes${params}`, { headers });
  }

  getHero(id: number): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Hero>(`${this.API_URL}heroes/${id}`, { headers });
  }

  createHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<Hero>(`${this.API_URL}heroes`, hero, { headers });
  }

  updateHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<Hero>(`${this.API_URL}heroes/${hero.id}`, hero, { headers });
  }

  deleteHero(id: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.API_URL}heroes/${id}`, { headers });
  }

}
