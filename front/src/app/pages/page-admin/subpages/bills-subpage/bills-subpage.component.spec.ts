import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsSubpageComponent } from './bills-subpage.component';

describe('BillsSubpageComponent', () => {
  let component: BillsSubpageComponent;
  let fixture: ComponentFixture<BillsSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
