import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavLogoComponent } from './fav-logo.component';

describe('FavLogoComponent', () => {
  let component: FavLogoComponent;
  let fixture: ComponentFixture<FavLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
