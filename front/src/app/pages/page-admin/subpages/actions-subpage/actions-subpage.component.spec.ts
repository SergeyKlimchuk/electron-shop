import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSubpageComponent } from './actions-subpage.component';

describe('ActionsSubpageComponent', () => {
  let component: ActionsSubpageComponent;
  let fixture: ComponentFixture<ActionsSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
