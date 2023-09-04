import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBooksHeaderComponent } from './customer-books-header.component';

describe('CustomerBooksHeaderComponent', () => {
  let component: CustomerBooksHeaderComponent;
  let fixture: ComponentFixture<CustomerBooksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBooksHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBooksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
