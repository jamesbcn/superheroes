import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { SidebarComponent } from './sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const initialState = { };
  let myFormGroup: FormGroup;
  let submitButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    myFormGroup = component.heroForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is empty', () => {
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBe(true);
  });


  it('should have an invalid name field', () => {

    let name = myFormGroup.controls['name'];
    expect(name.valid).toBeFalsy();

    let errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

  });


  it('should have a valid intelligence field', () => {

    let intelligence = myFormGroup.controls['intelligence'];
    expect(intelligence.valid).toBeFalsy();
    intelligence.setValue(99);

    let errors = intelligence.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeFalsy();

  });



  it('should have an invalid name field', () => {
    expect(myFormGroup.valid).toBeFalsy();
  });



  it('should enable submit button when form is full', () => {

    myFormGroup.controls['name'].setValue('test');
    myFormGroup.controls['intelligence'].setValue(99);
    myFormGroup.controls['strength'].setValue(99);
    myFormGroup.controls['durability'].setValue(99);
    myFormGroup.controls['power'].setValue(99);
    myFormGroup.controls['speed'].setValue(99);
    myFormGroup.controls['combat'].setValue(99);

    expect(myFormGroup.valid).toBeTruthy();

    fixture.detectChanges();
    let submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBe(false);
    
  });
});
