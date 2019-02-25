import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCategoriesComponent } from './best-categories.component';

describe('BestCategoriesComponent', () => {
  let component: BestCategoriesComponent;
  let fixture: ComponentFixture<BestCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
