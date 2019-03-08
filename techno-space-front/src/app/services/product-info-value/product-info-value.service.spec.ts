import { TestBed } from '@angular/core/testing';

import { ProductInfoValueService } from './product-info-value.service';

describe('ProductInfoValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInfoValueService = TestBed.get(ProductInfoValueService);
    expect(service).toBeTruthy();
  });
});
