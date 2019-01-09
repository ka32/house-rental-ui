import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarInfoComponent } from './snack-bar-info.component';

describe('SnackBarInfoComponent', () => {
  let component: SnackBarInfoComponent;
  let fixture: ComponentFixture<SnackBarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
