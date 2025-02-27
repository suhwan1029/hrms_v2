import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlfComponent } from './olf.component';

describe('OlfComponent', () => {
  let component: OlfComponent;
  let fixture: ComponentFixture<OlfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
