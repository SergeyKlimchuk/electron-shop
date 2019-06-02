import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListMinComponent } from './product-list-min.component';

describe('ProductListMinComponent', () => {
  let component: ProductListMinComponent;
  let fixture: ComponentFixture<ProductListMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
