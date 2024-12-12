import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesRegisterPage } from './sales-register.page';

describe('SalesRegisterPage', () => {
  let component: SalesRegisterPage;
  let fixture: ComponentFixture<SalesRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
