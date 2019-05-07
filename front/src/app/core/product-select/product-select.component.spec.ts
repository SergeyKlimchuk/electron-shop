import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectDialog } from './product-select.component';

describe('ProductSelectComponent', () => {
  let component: ProductSelectDialog;
  let fixture: ComponentFixture<ProductSelectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
