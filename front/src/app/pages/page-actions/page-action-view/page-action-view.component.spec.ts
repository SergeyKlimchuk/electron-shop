import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageActionViewComponent } from './page-action-view.component';

describe('PageActionViewComponent', () => {
  let component: PageActionViewComponent;
  let fixture: ComponentFixture<PageActionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageActionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageActionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
