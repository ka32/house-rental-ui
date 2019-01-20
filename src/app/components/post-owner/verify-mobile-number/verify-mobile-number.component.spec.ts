import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMobileNumberComponent } from './verify-mobile-number.component';

describe('VerifyMobileNumberComponent', () => {
  let component: VerifyMobileNumberComponent;
  let fixture: ComponentFixture<VerifyMobileNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyMobileNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
