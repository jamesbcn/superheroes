import { TestBed, fakeAsync, tick, ComponentFixture } from "@angular/core/testing";
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { AppComponent } from "./app.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { routes } from './app.routes';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';


describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  const initialState = { };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HeroListComponent, NotFoundComponent, SidebarComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to invalid path redirects you to /404', fakeAsync(() => {
    router.navigate(['zzzzz']);
    tick(); 
    expect(location.path()).toBe('/404');
  }));

});