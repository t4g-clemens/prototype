import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHintsComponent } from './department-hints.component';

describe('DepartmentHintsComponent', () => {
  let component: DepartmentHintsComponent;
  let fixture: ComponentFixture<DepartmentHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentHintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
