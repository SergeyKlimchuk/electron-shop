import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeSubpageComponent } from './product-type-subpage.component';

describe('ProductTypeSubpageComponent', () => {
  let component: ProductTypeSubpageComponent;
  let fixture: ComponentFixture<ProductTypeSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
