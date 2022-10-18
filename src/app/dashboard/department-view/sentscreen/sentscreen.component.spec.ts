import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentscreenComponent } from './sentscreen.component';

describe('SentscreenComponent', () => {
  let component: SentscreenComponent;
  let fixture: ComponentFixture<SentscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
