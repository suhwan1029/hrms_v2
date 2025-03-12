import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfrListComponent } from './rfr-list.component';

describe('RfrListComponent', () => {
  let component: RfrListComponent;
  let fixture: ComponentFixture<RfrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RfrListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
