import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProductGroupComponent } from './page-product-group.component';

describe('PageProductGroupComponent', () => {
  let component: PageProductGroupComponent;
  let fixture: ComponentFixture<PageProductGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProductGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
