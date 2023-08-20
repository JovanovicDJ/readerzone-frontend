import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { User } from '../../model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user!: User;
  private userSubscription!: Subscription;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.getUserSubject().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogoClick() {
    this.router.navigate(['/shop']);
  }

  register() {
    this.router.navigate(['/login/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }

}
