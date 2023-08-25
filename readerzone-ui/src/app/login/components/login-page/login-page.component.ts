import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { LoginData } from 'src/app/shared/model/LoginData';
import { AuthService } from '../../services/auth-service/auth.service';
import { Role } from 'src/app/shared/model/enums/Role';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedId) {
      this.redirectLoggedUser();
    }
    let activationStatus = this.route.snapshot.paramMap.get('status');
    if (activationStatus !== null)
      this.showActivationStatusMessage(activationStatus);
  }  

  loginRequest() {
    let data: LoginData = this.form.getRawValue();
    this.authService
      .sendLoginRequest(data)      
      .subscribe({
        next: (res: string) => {          
          this.authService.setToken(res);
          this.redirectLoggedUser();
        },
        error: (err) => {          
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        },
      });
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent);

    dialogRef
      .afterClosed()      
      .subscribe((res) => {
        if (res) {
          this.messageService.showMessage(
            'E-mail for password change has been sent!',
            MessageType.SUCCESS
          );
        }
      });
  }
  
  redirectLoggedUser() {
    if (this.authService.user?.UserAccount.role === Role.Customer) {
      this.router.navigateByUrl('shop');
    } else if (this.authService.user?.UserAccount.role === Role.Manager) {
      this.router.navigateByUrl('shop');  // Manager won't be routered to /shop 
    } else {  //Admin
      this.router.navigateByUrl('shop');  // Admin won't be routered to /shop
    }
  }

  showActivationStatusMessage(activationStatus: string) {
    switch (activationStatus) {
      case 'success': {
        this.messageService.showMessage(
          'Account successfully activated!',
          MessageType.SUCCESS
        ); 
        break;
      }
      case 'alreadyactive': {
        this.messageService.showMessage(
          'Account is already active!',
          MessageType.WARNING
        );
        break;
      }
      case 'invalidactivation': {
        this.messageService.showMessage(
          'Activation has failed!',
          MessageType.ERROR
        );
        break;
      }
    }
  }

}
