import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlpComponent } from './alp.component';

describe('AlpComponent', () => {
  let component: AlpComponent;
  let fixture: ComponentFixture<AlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
