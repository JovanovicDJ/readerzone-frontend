import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchingPasswordsValidator } from 'src/app/shared/validators/validators';
import { AuthService } from '../../services/auth-service/auth.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ResetPassword } from 'src/app/shared/model/ResetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup = this.getPasswordResetForm();
  token: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    if (!this.authService.isUserLoggedId) {
      const token = this.route.snapshot.paramMap.get('token');
      if (token !== null) {
        this.token = token
      } else {
        this.messageService.showMessage('Reset password token is not valid.', MessageType.ERROR);
        this.router.navigateByUrl('login');
      }
    }
  }

  getPasswordResetForm(): FormGroup {
    return new FormGroup({
        Password: new FormControl('',Validators.compose([Validators.minLength(8), Validators.maxLength(30),])),
        ConfirmPassword: new FormControl(''),
      },
      { validators: matchingPasswordsValidator }
    );
  }

  sendResetRequest(): void {
    let resetPassword: ResetPassword = {
      Password: this.form.controls['Password'].value,
      ConfirmPassword: this.form.controls['ConfirmPassword'].value,
      Token: this.token,
    };
    this.authService
      .sendResetPasswordRequest(resetPassword)    
      .subscribe({
        next: () => {                    
          this.messageService.showMessage('Password has been changed!', MessageType.SUCCESS);
          this.router.navigateByUrl('login');
        },
        error: (err) => {          
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        },
      });
    
  }

}
