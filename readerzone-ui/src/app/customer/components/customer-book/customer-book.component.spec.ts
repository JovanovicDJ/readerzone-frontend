import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBookComponent } from './customer-book.component';

describe('CustomerBookComponent', () => {
  let component: CustomerBookComponent;
  let fixture: ComponentFixture<CustomerBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
