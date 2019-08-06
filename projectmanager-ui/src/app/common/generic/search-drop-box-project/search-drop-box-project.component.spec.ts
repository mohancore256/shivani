import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropBoxProjectComponent } from './search-drop-box-project.component';

describe('SearchDropBoxProjectComponent', () => {
  let component: SearchDropBoxProjectComponent;
  let fixture: ComponentFixture<SearchDropBoxProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropBoxProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropBoxProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
