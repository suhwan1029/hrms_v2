import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePoliciesComponent } from './attendance-policies.component';

describe('AttendancePoliciesComponent', () => {
  let component: AttendancePoliciesComponent;
  let fixture: ComponentFixture<AttendancePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendancePoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
