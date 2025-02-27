import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfrRgComponent } from './rfr-rg.component';

describe('RfrRgComponent', () => {
  let component: RfrRgComponent;
  let fixture: ComponentFixture<RfrRgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RfrRgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfrRgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
