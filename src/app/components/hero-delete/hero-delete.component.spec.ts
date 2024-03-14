import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeroDeleteComponent } from './hero-delete.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('HeroDeleteComponent', () => {
  let component: HeroDeleteComponent;
  let fixture: ComponentFixture<HeroDeleteComponent>;

  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroDeleteComponent, MatDialogModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

