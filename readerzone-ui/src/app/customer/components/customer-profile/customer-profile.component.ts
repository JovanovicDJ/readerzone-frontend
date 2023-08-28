import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { Customer } from 'src/app/shared/model/Customer';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';
import { BookData } from 'src/app/shared/model/BookData';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customer!: Customer;
  booksData: BookData[] = [];

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private messageService: MessageService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.customerService
        .getCustomerById(+id)
        .subscribe({
          next: (res: Customer) => {
            this.customer = res;
            console.log(this.customer);
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
            this.router.navigate(['/shop']);
          }
        });
      this.customerService
        .getBooksDataByCustomerId(+id)
        .subscribe({
          next: (res: BookData[]) => {
            this.booksData = res;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
    } else {
      this.router.navigate(['/shop']);
    } 
  }

  get isCustomerLoggedIn(): boolean {
    return this.authService.user?.id === this.customer.id;
  }

  get carouselTitle(): string {
    return this.customer?.name + "'s books";
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
      data: this.customer,
      width: '60%',
      height: '90%'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customer = result.data;
        this.messageService.showMessage('Profile has been updated!', MessageType.SUCCESS);
      }

    })
  }

}
