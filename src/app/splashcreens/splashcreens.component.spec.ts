import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashcreensComponent } from './splashcreens.component';

describe('SplashcreensComponent', () => {
  let component: SplashcreensComponent;
  let fixture: ComponentFixture<SplashcreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashcreensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashcreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
