import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpComponent } from './olp.component';

describe('OlpComponent', () => {
  let component: OlpComponent;
  let fixture: ComponentFixture<OlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
