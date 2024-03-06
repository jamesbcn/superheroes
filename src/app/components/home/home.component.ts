import { Component } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service'
import { Hero } from '../../models/hero';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  heroes: Hero[] = [];

  constructor(private superheroesService: SuperheroesService) { }

  ngOnInit() {
    this.superheroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;

      console.log("heros", this.heroes)
    });
  }


}
