import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Hero } from '../../models/hero';
import { LoadingService } from '../../services/loading.service';
import { HeroesService } from '../../services/heroes.service';
import { HeroesStore } from '../../store/heroes.store';
import { MatIcon } from '@angular/material/icon';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIcon],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements AfterViewInit {
  
  store = inject(HeroesStore);

  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat', 'delete'];
  dataSource = new MatTableDataSource<Hero>(this.store.heroes());

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private heroesService: HeroesService, private loading: LoadingService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(){
    // this.loading.loadingOn();
  }

  ngAfterViewInit() {
    
        // temporary solution
        setTimeout(() => {
          if(this.paginator) {
          
            this.dataSource = new MatTableDataSource<Hero>(this.store.heroes());
            this.dataSource.paginator = this.paginator; 
            
          }
        }, 500)

  }

  async onEditHero(id:string) {
    await this.store.deleteHero(id);
    this.store.heroes();

    const updatedHeroes = this.store.heroes().filter(hero => hero.id !== id);

    this.tableRefresh(updatedHeroes)

  }

  
  
  async onDeleteHero(id:string){
    await this.store.deleteHero(id);
    this.store.heroes();

    const updatedHeroes = this.store.heroes().filter(hero => hero.id !== id);

    this.tableRefresh(updatedHeroes)

  }

  tableRefresh(updatedHeroes:Hero[]){

    this.dataSource = new MatTableDataSource<Hero>(updatedHeroes);
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  
}
