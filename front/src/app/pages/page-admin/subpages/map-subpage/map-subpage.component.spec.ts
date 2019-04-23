import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSubpageComponent } from './map-subpage.component';

describe('MapSubpageComponent', () => {
  let component: MapSubpageComponent;
  let fixture: ComponentFixture<MapSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
