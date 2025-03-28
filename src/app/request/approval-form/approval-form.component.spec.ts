import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFormComponent } from './approval-form.component';

describe('ApprovalFormComponent', () => {
  let component: ApprovalFormComponent;
  let fixture: ComponentFixture<ApprovalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
