import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtNavbarComponent } from './bt-navbar.component';

describe('BtNavbarComponent', () => {
  let component: BtNavbarComponent;
  let fixture: ComponentFixture<BtNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
