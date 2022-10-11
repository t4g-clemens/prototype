import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHintsComponent } from './hr-hints.component';

describe('HrHintsComponent', () => {
  let component: HrHintsComponent;
  let fixture: ComponentFixture<HrHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrHintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
