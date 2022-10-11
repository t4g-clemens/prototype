import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintboxComponent } from './hintbox.component';

describe('HintboxComponent', () => {
  let component: HintboxComponent;
  let fixture: ComponentFixture<HintboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
