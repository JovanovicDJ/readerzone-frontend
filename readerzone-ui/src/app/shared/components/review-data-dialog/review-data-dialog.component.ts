import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ReviewData {
  title: string,
  rating: number,
  text: string
}

@Component({
  selector: 'app-review-data-dialog',
  templateUrl: './review-data-dialog.component.html',
  styleUrls: ['./review-data-dialog.component.css']
})
export class ReviewDataDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReviewData,
              public dialogRef: MatDialogRef<ReviewDataDialogComponent>) { }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

}
