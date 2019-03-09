import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesSubpageComponent } from './dictionaries-subpage.component';

describe('DictionariesSubpageComponent', () => {
  let component: DictionariesSubpageComponent;
  let fixture: ComponentFixture<DictionariesSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionariesSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionariesSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
