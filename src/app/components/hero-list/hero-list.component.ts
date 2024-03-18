import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { Hero } from '../../interfaces/hero';
import { MatIcon } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { heroesSelector } from '../../store/selectors';
import { AppStateInterface } from '../../interfaces/appState';
import { HeroEditComponent } from '../hero-edit/hero-edit.component';
import { TitleCasePipe } from '@angular/common';
import { getSpanishPaginatorIntl } from './spanish-paginator.intl';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HeroDeleteComponent } from '../hero-delete/hero-delete.component';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDialogModule,
    MatInputModule, MatIcon, TitleCasePipe],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {

  displayedColumns: string[] = ['name', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat', 'delete'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) { }

  private destroy$ = new Subject<void>();

  ngOnInit() {

    this.store.pipe(
      select(heroesSelector),
      takeUntil(this.destroy$)
      ).subscribe(heroes => {

      if (this.paginator) {

        const sortedHeroes = [...heroes].sort((a, b) => a.name.localeCompare(b.name));

        this.dataSource = new MatTableDataSource<Hero>(sortedHeroes);
        this.dataSource.paginator = this.paginator;

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

    dialogConfig.data = {...element,
                          powerstats: {...element.powerstats}
                        };

    this.dialog.open(HeroEditComponent, dialogConfig);

  }



  async onDeleteHero(id: string, name: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {id: id, name: name};

    this.dialog.open(HeroDeleteComponent, dialogConfig);

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
