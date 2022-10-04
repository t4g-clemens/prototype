import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringManagerComponent } from './hiring-manager.component';

describe('HiringManagerComponent', () => {
  let component: HiringManagerComponent;
  let fixture: ComponentFixture<HiringManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
