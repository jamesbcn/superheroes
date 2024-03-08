import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from '../models/hero';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private API_URL = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  async getHeroes(): Promise<Hero[] | undefined> {

    const heroes$ = this.http.get<Hero[]>(`${this.API_URL}heroes`)

    return lastValueFrom(heroes$);
  }

  async addHero(hero:Partial<Hero>): Promise<Hero> {

    const hero$ = this.http.post<Hero>(`${this.API_URL}heroes`, hero);

    return lastValueFrom(hero$);
  }

  async deleteHero(id:string): Promise<any> {

    const hero$ = this.http.delete(`${this.API_URL}heroes/${id}`);

    return lastValueFrom(hero$);
  }

  async updateHero(id:string,hero:Hero): Promise<any> {

    const hero$ = this.http.put<Hero>(`${this.API_URL}heroes/${id}`,hero)

    return lastValueFrom(hero$);
  }



}
