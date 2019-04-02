import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordDialog } from './change-password-dialog';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordDialog;
  let fixture: ComponentFixture<ChangePasswordDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
