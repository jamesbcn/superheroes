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


describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HeroListComponent, NotFoundComponent, SidebarComponent, BrowserAnimationsModule],
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

  it('navigate to "/zzz" should render 404 NotFoundComponent', fakeAsync(() => {
    router.navigate(["/zzz"]).then(() => {
      fixture.detectChanges(); // Trigger change detection
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-not-found')).toBeTruthy(); 
    });
  }));

});