import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfComponent } from './alf.component';

describe('AlfComponent', () => {
  let component: AlfComponent;
  let fixture: ComponentFixture<AlfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
