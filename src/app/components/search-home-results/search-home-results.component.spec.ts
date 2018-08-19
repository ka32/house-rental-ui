import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeResultsComponent } from './search-home-results.component';

describe('SearchHomeResultsComponent', () => {
  let component: SearchHomeResultsComponent;
  let fixture: ComponentFixture<SearchHomeResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomeResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
