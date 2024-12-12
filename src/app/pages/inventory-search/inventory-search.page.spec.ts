import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventorySearchPage } from './inventory-search.page';

describe('InventorySearchPage', () => {
  let component: InventorySearchPage;
  let fixture: ComponentFixture<InventorySearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
