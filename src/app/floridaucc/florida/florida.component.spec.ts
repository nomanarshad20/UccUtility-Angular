import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloridaComponent } from './florida.component';

describe('FloridaComponent', () => {
  let component: FloridaComponent;
  let fixture: ComponentFixture<FloridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloridaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
