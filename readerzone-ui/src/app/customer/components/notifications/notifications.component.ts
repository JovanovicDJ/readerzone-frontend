import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number = 1;
  totalNotifications: number = 0;
  notifications: any[] = []
  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    //this.init();
  }

}
