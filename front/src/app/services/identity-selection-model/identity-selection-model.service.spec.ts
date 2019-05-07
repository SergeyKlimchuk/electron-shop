import { TestBed } from '@angular/core/testing';

import { IdentitySelectionModel } from './identity-selection-model.service';

describe('IdentitySelectionModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentitySelectionModel = TestBed.get(IdentitySelectionModel);
    expect(service).toBeTruthy();
  });
});
