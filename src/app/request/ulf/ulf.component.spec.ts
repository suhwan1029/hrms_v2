import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlfComponent } from './ulf.component';

describe('UlfComponent', () => {
  let component: UlfComponent;
  let fixture: ComponentFixture<UlfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UlfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
