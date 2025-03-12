import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RlfComponent } from './rlf.component';

describe('RlfComponent', () => {
  let component: RlfComponent;
  let fixture: ComponentFixture<RlfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RlfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
