import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTierComponent } from './customer-tier.component';

describe('CustomerTierComponent', () => {
  let component: CustomerTierComponent;
  let fixture: ComponentFixture<CustomerTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
