import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeroListComponent } from './hero-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListComponent, HttpClientModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
