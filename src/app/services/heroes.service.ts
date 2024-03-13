import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private API_URL = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }
  

  getHeroes(): Observable<Hero[] | undefined> {

    return this.http.get<Hero[]>(`${this.API_URL}heroes`);

  }

  addHero(hero:Partial<Hero>): Observable<Hero> {

    return this.http.post<Hero>(`${this.API_URL}heroes`, hero);

  }

  deleteHero(id:string): Observable<any> {

    return this.http.delete(`${this.API_URL}heroes/${id}`);

  }

 updateHero(id:string,hero:Hero): Observable<any> {

    return this.http.put<Hero>(`${this.API_URL}heroes/${id}`,hero)

  }



}
