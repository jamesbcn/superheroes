import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { Hero } from '../../models/hero';
import { MatIcon } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { heroesSelector } from '../../store/selectors';
import { AppStateInterface } from '../../models/appState';
import * as HeroesActions from '../../store/actions';
import { HeroEditComponent } from '../hero-edit/hero-edit.component';
import { TitleCasePipe } from '@angular/common';
import { getSpanishPaginatorIntl } from './spanish-paginator.intl';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSortModule, MatFormFieldModule, MatDialogModule,
    MatInputModule, MatIcon, TitleCasePipe],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {

  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat', 'delete'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) { }

  ngOnInit() {

    this.store.pipe(select(heroesSelector)).subscribe(heroes => {

      if (this.paginator && this.sort) {

        this.dataSource = new MatTableDataSource<Hero>(heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }

    })
  }



  doFilter(event: any) {

    const val = event.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = val;

    this.dataSource.filterPredicate = (data: any, filter: string) => {

      return data.name.toLocaleLowerCase().includes(filter);
    };

    
  }

  onEditHero(element: Hero) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {...element,
                          powerstats: {...element.powerstats}
                        };
    

      this.dialog.open(HeroEditComponent, dialogConfig);


  }



  async onDeleteHero(id: string) {

    this.store.dispatch(HeroesActions.deleteHero({ id: id }))

  }


  // tableRefresh(updatedHeroes:Hero[]){

  //   this.dataSource = new MatTableDataSource<Hero>(updatedHeroes);
  //   if(this.paginator) {
  //     this.dataSource.paginator = this.paginator;
  //   }
  // }


}
