import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlpComponent } from './ulp.component';

describe('UlpComponent', () => {
  let component: UlpComponent;
  let fixture: ComponentFixture<UlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UlpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
