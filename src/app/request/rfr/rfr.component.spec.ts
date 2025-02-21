import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfrComponent } from './rfr.component';

describe('RfrComponent', () => {
  let component: RfrComponent;
  let fixture: ComponentFixture<RfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RfrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
