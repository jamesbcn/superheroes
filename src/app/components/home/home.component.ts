import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SuperheroesService } from '../../services/superheroes.service'
import { Hero } from '../../models/hero';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  heroes: Hero[] = [];
  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
  dataSource = new MatTableDataSource<Hero>(this.heroes);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private superheroesService: SuperheroesService) { }

  ngAfterViewInit() {
    
    this.superheroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;

      if(this.paginator) {
        this.dataSource = new MatTableDataSource<Hero>(this.heroes);
        this.dataSource.paginator = this.paginator;  
      }

    });

  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}