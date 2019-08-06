import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropBoxComponent } from './search-drop-box.component';

describe('SearchDropBoxComponent', () => {
  let component: SearchDropBoxComponent;
  let fixture: ComponentFixture<SearchDropBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
