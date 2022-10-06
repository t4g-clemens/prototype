import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourcesViewComponent } from './human-resources-view.component';

describe('HumanResourcesViewComponent', () => {
  let component: HumanResourcesViewComponent;
  let fixture: ComponentFixture<HumanResourcesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanResourcesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanResourcesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
