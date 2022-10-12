import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponentHR } from './stepper.component';

describe('StepperComponentHR', () => {
  let component: StepperComponentHR;
  let fixture: ComponentFixture<StepperComponentHR>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperComponentHR ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperComponentHR);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
