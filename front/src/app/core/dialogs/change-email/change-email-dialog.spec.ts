import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailDialog } from './change-email-dialog';

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailDialog;
  let fixture: ComponentFixture<ChangeEmailDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
