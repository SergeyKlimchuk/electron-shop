import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPropertyValueEditorComponent } from './product-property-value-editor.component';

describe('ProductPropertyValueEditorComponent', () => {
  let component: ProductPropertyValueEditorComponent;
  let fixture: ComponentFixture<ProductPropertyValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPropertyValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPropertyValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
