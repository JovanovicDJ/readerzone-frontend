import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBooksComponent } from './customer-books.component';

describe('CustomerBooksComponent', () => {
  let component: CustomerBooksComponent;
  let fixture: ComponentFixture<CustomerBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
