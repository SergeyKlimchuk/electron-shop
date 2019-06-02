import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDeliveryAddressDialogComponent } from './select-delivery-address-dialog.component';

describe('SelectDeliveryAddressDialogComponent', () => {
  let component: SelectDeliveryAddressDialogComponent;
  let fixture: ComponentFixture<SelectDeliveryAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDeliveryAddressDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDeliveryAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
