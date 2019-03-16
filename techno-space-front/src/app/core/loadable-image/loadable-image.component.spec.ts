import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableImageComponent } from './loadable-image.component';

describe('LoadableImageComponent', () => {
  let component: LoadableImageComponent;
  let fixture: ComponentFixture<LoadableImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadableImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
