import { TestBed } from '@angular/core/testing';

import { ProductInfoTitleService } from './product-info-title.service';

describe('ProductInfoTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInfoTitleService = TestBed.get(ProductInfoTitleService);
    expect(service).toBeTruthy();
  });
});
