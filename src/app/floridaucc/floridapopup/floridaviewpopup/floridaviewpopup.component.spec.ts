import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloridaviewpopupComponent } from './floridaviewpopup.component';

describe('FloridaviewpopupComponent', () => {
  let component: FloridaviewpopupComponent;
  let fixture: ComponentFixture<FloridaviewpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloridaviewpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloridaviewpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
