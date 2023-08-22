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
      Email: new FormControl('', Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')),
      Password: new FormControl('', Validators.compose([Validators.minLength(8),Validators.maxLength(30)])),
      ConfirmPassword: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.pattern('^[0-9]{9,12}$')),
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
    console.log($event);
  }

  registerRequest() {
    this.authService
      .senCustomerRegistrationRequest(this.createCustomerRegistartionRequest())
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
      Username: this.form.get('Username')?.value,
      Email: this.form.get('Email')?.value,
      Password: this.form.get('Password')?.value,
      ConfirmPassword: this.form.get('ConfirmPassword')?.value,
      Name: this.form.get('Name')?.value,
      Surname: this.form.get('Surname')?.value,
      PhoneNumber: this.form.get('PhoneNumber')?.value,
      Street: this.form.get('Street')?.value,
      Number: this.form.get('Number')?.value,
      City: this.form.get('City')?.value,
      Country: this.form.get('Country')?.value.name,
      PostalCode: this.form.get('PostalCode')?.value,
      Dob: formattedDate
    };
    return crr;
  }
}
