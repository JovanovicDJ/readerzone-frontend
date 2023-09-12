import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/shared/model/Order';

@Component({
  selector: 'app-customer-data-dialog',
  templateUrl: './customer-data-dialog.component.html',
  styleUrls: ['./customer-data-dialog.component.css']
})
export class CustomerDataDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerDataDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Order) { }

  ngOnInit(): void {
  }

  onExitClick() {  
    this.dialogRef.close(false);
  }

}
