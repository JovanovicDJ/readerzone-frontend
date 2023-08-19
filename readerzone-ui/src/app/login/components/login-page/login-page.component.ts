import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { LoginData } from 'src/app/shared/model/LoginData';
import { AuthService } from '../../services/auth-service/auth.service';
import { Role } from 'src/app/shared/model/enums/Role';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedId) {
      this.redirectLoggedUser();
    }
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

  }
  
  redirectLoggedUser() {
    if (this.authService.user?.UserAccount.Role === Role.Customer) {
      this.router.navigateByUrl('shop');
    } else if (this.authService.user?.UserAccount.Role === Role.Manager) {
      this.router.navigateByUrl('shop');  // Manager won't be routered to /shop 
    } else {  //Admin
      this.router.navigateByUrl('shop');  // Admin won't be routered to /shop
    }
  }

}
