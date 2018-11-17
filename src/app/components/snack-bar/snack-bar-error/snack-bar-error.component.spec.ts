import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarErrorComponent } from './snack-bar-error.component';

describe('SnackBarErrorComponent', () => {
  let component: SnackBarErrorComponent;
  let fixture: ComponentFixture<SnackBarErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
