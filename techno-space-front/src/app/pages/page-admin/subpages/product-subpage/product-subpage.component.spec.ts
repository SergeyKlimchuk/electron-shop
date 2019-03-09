import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubpageComponent } from './product-subpage.component';

describe('ProductSubpageComponent', () => {
  let component: ProductSubpageComponent;
  let fixture: ComponentFixture<ProductSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
