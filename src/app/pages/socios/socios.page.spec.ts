import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosPage } from './socios.page';

describe('SociosPage', () => {
  let component: SociosPage;
  let fixture: ComponentFixture<SociosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
