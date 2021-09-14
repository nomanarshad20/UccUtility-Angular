import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoradoComponent } from './colorado.component';

describe('ColoradoComponent', () => {
  let component: ColoradoComponent;
  let fixture: ComponentFixture<ColoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
