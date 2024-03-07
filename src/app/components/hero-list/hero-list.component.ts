import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SuperheroesService } from '../../services/superheroes.service'
import { Hero } from '../../models/hero';
import { LoadingService } from '../../services/loading.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements AfterViewInit {
  heroes: Hero[] = [];
  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
  dataSource = new MatTableDataSource<Hero>(this.heroes);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private superheroesService: SuperheroesService, private loading: LoadingService) { }

  ngOnInit(){
    this.loading.loadingOn();
  }

  ngAfterViewInit() {
    
    this.superheroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;

      if(this.paginator) {
        this.dataSource = new MatTableDataSource<Hero>(this.heroes);
        this.dataSource.paginator = this.paginator;  
      }
      this.loading.loadingOff();

    });

  }
}
