import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsPoliciesComponent } from './benefits-policies.component';

describe('BenefitsPoliciesComponent', () => {
  let component: BenefitsPoliciesComponent;
  let fixture: ComponentFixture<BenefitsPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenefitsPoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
