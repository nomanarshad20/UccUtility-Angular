import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliforniaviewpopupComponent } from './californiaviewpopup.component';

describe('CaliforniaviewpopupComponent', () => {
  let component: CaliforniaviewpopupComponent;
  let fixture: ComponentFixture<CaliforniaviewpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaliforniaviewpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliforniaviewpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
