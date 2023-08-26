import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { User } from 'src/app/shared/model/User';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  form: FormGroup = this.createFormGroup();

  user!: User;

  endPrice: number = 0;
  paid: boolean = false;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.user !== null) {
      this.user = this.authService.user;
      this.fillForm();
    }
    this.endPrice = this.cartService.finalPrice;
    window.paypal.Buttons({
      // style: {
      //   layout: 'horizontal',
      //   color: 'blue',
      //   shape: 'rect',
      //   label: 'paypal'
      // }, 
      createOrder: (data: any, actions: any) => {
        if (!this.form.valid) {
          this.messageService.showMessage('Personal data form is not filled correctly.', MessageType.WARNING);
          return null;
        } else if (this.cartService.getCart().length === 0) {
          this.messageService.showMessage('The cart is empty.', MessageType.WARNING);
          return null;
        } else {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.endPrice.toString(),
                  currency_code: 'EUR'
                }
              }
            ]
          });
        }        
      },
      onApprove: (data: any, actions: any) => {        
        return actions.order.capture().then((details: any) => {                    
          this.messageService.showMessage('Transaction completed successfully!', MessageType.SUCCESS);
          this.cartService.clearCart();
          //this.router.navigateByUrl('shop');
        });
      },
      onError: (error: any) => {        
        
      }
    }).render(this.paypalElement.nativeElement);  
  }  

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')),
      phoneNumber: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }

  fillForm() {
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('surname')?.setValue(this.user.surname);
    this.form.get('email')?.setValue(this.user.userAccount.email);
    this.form.get('phoneNumber')?.setValue(this.user.phoneNumber);
    this.form.get('street')?.setValue(this.user.address.street);
    this.form.get('number')?.setValue(this.user.address.number);
    this.form.get('city')?.setValue(this.user.address.city);
    this.form.get('postalCode')?.setValue(this.user.address.postalCode);
    this.form.get('country')?.setValue(this.user.address.country);
  }
}
