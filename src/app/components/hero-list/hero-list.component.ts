import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Hero } from '../../models/hero';
import { MatIcon } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { heroesSelector } from '../../store/selectors';
import { AppStateInterface } from '../../models/appState';
import * as HeroesActions from '../../store/actions';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSortModule, MatFormFieldModule,
    MatInputModule, MatIcon],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat', 'delete'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(){
    
    this.store.pipe( select(heroesSelector) ).subscribe(heroes => {

      if(this.paginator && this.sort) {
      
            this.dataSource = new MatTableDataSource<Hero>(heroes);
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort;
            
          }

    })
  }

  ngAfterViewInit() {

        // this.store.pipe( select(heroesSelector) ).subscribe(heroes => {

        //   if(this.paginator) {
          
        //         this.dataSource = new MatTableDataSource<Hero>(heroes);
        //         this.dataSource.paginator = this.paginator; 
                
        //       }

        // })
        
    


  };

  doFilter(event: any) {

    let val = event.target.value;
    this.dataSource.filter = val.trim().toLocaleLowerCase();
  }
  
onEditHero(id:string) {
    // await this.store.deleteHero(id);
    // this.store.heroes();

    // const updatedHeroes = this.store.heroes().filter(hero => hero.id !== id);

    // this.tableRefresh(updatedHeroes)

  }

  
  
  async onDeleteHero(id:string){
    
    this.store.dispatch(HeroesActions.deleteHero({id: id}))

  }
  

  // tableRefresh(updatedHeroes:Hero[]){

  //   this.dataSource = new MatTableDataSource<Hero>(updatedHeroes);
  //   if(this.paginator) {
  //     this.dataSource.paginator = this.paginator;
  //   }
  // }

  
}
