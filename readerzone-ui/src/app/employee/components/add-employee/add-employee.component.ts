import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { Country } from 'src/app/shared/model/Country';
import { Employee } from 'src/app/shared/model/Employee';
import { EmployeeRegistrationRequest } from 'src/app/shared/model/EmployeeRegistrationRequest';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { matchingPasswordsValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  form: FormGroup = this.createFormGroup();
  selectedRole: string = '';
  roles: string[] = ['Admin', 'Manager'];
  
  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  addEmployee() {
    if (this.selectedRole === '') {
      this.messageService.showMessage('Employee role is not selected.', MessageType.WARNING);
    } else if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
      this.messageService.showMessage('Password do not match.', MessageType.WARNING);
    } else {
      const parsedDate = new Date(this.form.get('dob')?.value);
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const year = parsedDate.getFullYear();
      var formattedDate = `${day}.${month}.${year}.`;
      var employeeRegRequest: EmployeeRegistrationRequest = {
        ...this.form.getRawValue(),
        role: this.selectedRole,
        country: this.form.get('country')?.value.name,
        dob: formattedDate
      }      
      this.authService
        .sendEmployeeRegistrationRequest(employeeRegRequest)
        .subscribe({
          next: (res: Employee) => {
            this.messageService.showMessage('Employee added!', MessageType.SUCCESS);
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
    }
  }

  onOptionSelect(event: MatSelectChange) {    
    this.selectedRole = event.value;
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

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')]),
      password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.required, Validators.maxLength(30)])),
      confirmPassword: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.pattern('^[0-9]{9,12}$'), Validators.required]),
      dob: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl(''),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }

}
