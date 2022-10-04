import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobDescriptionComponent } from './new-job-description.component';

describe('NewJobDescriptionComponent', () => {
  let component: NewJobDescriptionComponent;
  let fixture: ComponentFixture<NewJobDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJobDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
