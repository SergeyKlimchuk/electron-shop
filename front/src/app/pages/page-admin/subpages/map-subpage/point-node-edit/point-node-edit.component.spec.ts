import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointNodeEditComponent } from './point-node-edit.component';

describe('PointNodeEditComponent', () => {
  let component: PointNodeEditComponent;
  let fixture: ComponentFixture<PointNodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointNodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointNodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
