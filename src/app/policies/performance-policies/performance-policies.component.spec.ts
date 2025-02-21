import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancePoliciesComponent } from './performance-policies.component';

describe('PerformancePoliciesComponent', () => {
  let component: PerformancePoliciesComponent;
  let fixture: ComponentFixture<PerformancePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformancePoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformancePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
