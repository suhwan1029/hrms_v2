import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptMstComponent } from './dept-mst.component';

describe('DepMstComponent', () => {
  let component: DeptMstComponent;
  let fixture: ComponentFixture<DeptMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
