import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { HeroEditComponent } from './hero-edit.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Hero } from '../../models/hero';
import { By } from '@angular/platform-browser';

describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;
  let intelligenceInput: any;

  let hero = {
    "id": "731",
    "name": "Zoom",
    "slug": "731-zoom",
    "powerstats": {
      "intelligence": 50,
      "strength": 10,
      "speed": 100,
      "durability": 28,
      "power": 100,
      "combat": 28
    },
    "appearance": {
      "gender": "Male",
      "race": null,
      "height": [
        "6'1",
        "185 cm"
      ],
      "weight": [
        "181 lb",
        "81 kg"
      ],
      "eyeColor": "Red",
      "hairColor": "Brown"
    },
    "biography": {
      "fullName": "Hunter Zolomon",
      "alterEgos": "No alter egos found.",
      "aliases": [
        "-"
      ],
      "placeOfBirth": "-",
      "firstAppearance": "Flash Secret Files #3",
      "publisher": "DC Comics",
      "alignment": "bad"
    },
    "work": {
      "occupation": "-",
      "base": "Keystone City, Kansas"
    },
    "connections": {
      "groupAffiliation": "Secret Society of Super Villains, formerly Keystone Police Department, F.B.I.",
      "relatives": "Ashley Zolomon (ex-wife)"
    },
    "images": {
      "xs": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/731-zoom.jpg",
      "sm": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/731-zoom.jpg",
      "md": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/731-zoom.jpg",
      "lg": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/731-zoom.jpg"
    }
  }
  let MAT_DIALOG_DATA_MOCK: Partial<Hero> = hero;

  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HeroEditComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_MOCK},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    intelligenceInput = fixture.debugElement.query(By.css('input[name="intelligence"]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate intelligence input with data', () => {
    expect(intelligenceInput.nativeElement.value).toBe('50');
  });

  it('should display default image if data.images is not provided', () => {

    component.data.images = undefined;
    fixture.detectChanges();
  
    const defaultImage = fixture.debugElement.query(By.css('img[alt="Sin imágen"]')); 
  
    expect(defaultImage).not.toBeNull();
  });
  
  it('should display default image if data.images.lg is not provided', () => {

    component.data.images = { lg: '' };
    fixture.detectChanges();
  
    const defaultImage = fixture.debugElement.query(By.css('img[alt="Sin imágen"]'));
  
    expect(defaultImage).not.toBeNull();
  });
  
  it('should display image from data.images.lg if provided', () => {

    component.data.images = { lg: 'path/to/your/image.jpg' };
    fixture.detectChanges();
  
    const image = fixture.debugElement.query(By.css('img[src*="path/to/your/image.jpg"]'));
  
    expect(image).not.toBeNull();
  });
});
