import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/shared/model/Country';
import { matchingPasswordsValidator } from 'src/app/shared/validators/validators';
import { AuthService } from '../../services/auth-service/auth.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Customer } from 'src/app/shared/model/Customer';
import { Router } from '@angular/router';
import { CustomerRegistrationRequest } from 'src/app/shared/model/CustomerRegistrationRequest';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']  
})
export class RegisterPageComponent implements OnInit {  

  form: FormGroup = this.createFormGroup();

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      Username: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')]),
      Password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])),
      ConfirmPassword: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]),
      Dob: new FormControl('', Validators.required),
      Street: new FormControl('', Validators.required),
      Number: new FormControl(''),
      City: new FormControl('', Validators.required),
      PostalCode: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required)
    },
    { validators: matchingPasswordsValidator});
  }

  onCountrySelected($event: Country) {
    if ($event.alpha2Code === 'XK') this.form.get('Country')?.setValue({
      alpha2Code: 'RS',
      alpha3Code: 'SRB',
      callingCode: '+381',
      name: 'Serbia',
      numericCode: '688'
    });    
  }

  registerRequest() {
    this.authService
      .sendCustomerRegistrationRequest(this.createCustomerRegistartionRequest())
      .subscribe({
        next: () => {
          this.messageService.showMessage(
            'Registration is successful! The activation email has been sent.',
            MessageType.SUCCESS
          );          
          this.router.navigateByUrl('login');
        },
        error: (err) => {          
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        },
      });
  }

  createCustomerRegistartionRequest(): CustomerRegistrationRequest {
    const parsedDate = new Date(this.form.get('Dob')?.value);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    var formattedDate = `${day}.${month}.${year}.`;          
    var crr: CustomerRegistrationRequest = {
      username: this.form.get('Username')?.value,
      email: this.form.get('Email')?.value,
      password: this.form.get('Password')?.value,
      confirmPassword: this.form.get('ConfirmPassword')?.value,
      name: this.form.get('Name')?.value,
      surname: this.form.get('Surname')?.value,
      phoneNumber: this.form.get('PhoneNumber')?.value,
      street: this.form.get('Street')?.value,
      number: this.form.get('Number')?.value,
      city: this.form.get('City')?.value,
      country: this.form.get('Country')?.value.name,
      postalCode: this.form.get('PostalCode')?.value,
      dob: formattedDate
    };
    return crr;
  }
}
