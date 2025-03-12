import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUpMstComponent } from './look-up-mst.component';

describe('LookUpMstComponent', () => {
  let component: LookUpMstComponent;
  let fixture: ComponentFixture<LookUpMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookUpMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookUpMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
