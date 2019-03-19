import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeFilterComponent } from './product-type-filter.component';

describe('ProductTypeFilterComponent', () => {
  let component: ProductTypeFilterComponent;
  let fixture: ComponentFixture<ProductTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
