import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RlpComponent } from './rlp.component';

describe('RlpComponent', () => {
  let component: RlpComponent;
  let fixture: ComponentFixture<RlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RlpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
