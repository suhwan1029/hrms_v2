import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPoliciesComponent } from './hr-policies.component';

describe('HrPoliciesComponent', () => {
  let component: HrPoliciesComponent;
  let fixture: ComponentFixture<HrPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrPoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
