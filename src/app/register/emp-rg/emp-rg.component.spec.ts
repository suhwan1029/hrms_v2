import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRgComponent } from './emp-rg.component';

describe('EmpRgComponent', () => {
  let component: EmpRgComponent;
  let fixture: ComponentFixture<EmpRgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpRgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpRgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
