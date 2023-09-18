import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { LoginData } from 'src/app/shared/model/LoginData';
import { AuthService } from '../../services/auth-service/auth.service';
import { Role } from 'src/app/shared/model/enums/Role';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { Subscription, concatMap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private userSubscription!: Subscription;

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedId) {
      if (this.authService.user) {
        this.redirectLoggedUser(this.authService.user?.userAccount.role.toString());
      }      
    }
    let activationStatus = this.route.snapshot.paramMap.get('status');
    if (activationStatus !== null)
      this.showActivationStatusMessage(activationStatus);
    this.userSubscription = this.authService.getUserSubject().subscribe((user) => {
      if (user)
        this.redirectLoggedUser(user.userAccount.role.toString());
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  loginRequest() {
    if (this.form.valid) {
      let data: LoginData = this.form.getRawValue();
      this.authService
        .sendLoginRequest(data)      
        .subscribe({
          next: (res: string) => {    
            this.authService.setToken(res);                          
            //this.redirectLoggedUser(this.authService.setToken(res));
          },
          error: (err) => {          
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          },
        });
    } else {
      this.messageService.showMessage('Fill log in form correctly', MessageType.INFO);
    }
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
  
  redirectLoggedUser(role: string) {    
    if (role === '0' || role === 'Customer') {
      this.router.navigateByUrl('shop');
    } else if (role === '1' || role === 'Manager') {
      this.router.navigateByUrl('employee');
    } else if (role === '2' || role == 'Admin') {
      this.router.navigateByUrl('employee');      
    } else {
      this.router.navigateByUrl('shop');
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
