import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { Hero } from '../../models/hero';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SafeDataSourceModule } from '../../custom-pipes/safe-data-source/safe-data-source.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, SafeDataSourceModule, MatPaginatorModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  heroes$!: Observable<Hero[]>; // Use $ to indicate an observable
  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private superheroesService: SuperheroesService) { }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.heroes$ = this.superheroesService.getHeroes(); // Subscribe in ngOnInit
  }
}