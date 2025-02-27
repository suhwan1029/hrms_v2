import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMstComponent } from './app-mst.component';

describe('AppMstComponent', () => {
  let component: AppMstComponent;
  let fixture: ComponentFixture<AppMstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
