import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFavoritesComponent } from './page-favorites.component';

describe('PageFavoritesComponent', () => {
  let component: PageFavoritesComponent;
  let fixture: ComponentFixture<PageFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
