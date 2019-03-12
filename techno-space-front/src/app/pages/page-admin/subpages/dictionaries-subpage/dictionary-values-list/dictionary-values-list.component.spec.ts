import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryValuesListComponent } from './dictionary-values-list.component';

describe('DictionaryValuesListComponent', () => {
  let component: DictionaryValuesListComponent;
  let fixture: ComponentFixture<DictionaryValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
