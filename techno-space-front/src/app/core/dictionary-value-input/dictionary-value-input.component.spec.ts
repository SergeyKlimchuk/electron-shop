import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryValueInputComponent } from './dictionary-value-input.component';

describe('DictionaryValueInputComponent', () => {
  let component: DictionaryValueInputComponent;
  let fixture: ComponentFixture<DictionaryValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryValueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
