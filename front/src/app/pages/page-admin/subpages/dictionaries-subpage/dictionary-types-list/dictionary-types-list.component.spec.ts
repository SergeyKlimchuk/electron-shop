import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryTypesListComponent } from './dictionary-types-list.component';

describe('DictionaryTypesListComponent', () => {
  let component: DictionaryTypesListComponent;
  let fixture: ComponentFixture<DictionaryTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
