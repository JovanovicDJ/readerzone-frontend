import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  title = 'readerzone-ui';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isUserLoggedId) {
      this.authService.logout();
    }    
  }
}
