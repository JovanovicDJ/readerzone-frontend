import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'src/app/shared/model/Publisher';
import { PublisherRequest } from 'src/app/shared/model/PublisherRequest';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { PublisherService } from 'src/app/shared/services/publisher-service/publisher.service';

@Component({
  selector: 'app-add-publisher-dialog',
  templateUrl: './add-publisher-dialog.component.html',
  styleUrls: ['./add-publisher-dialog.component.css']
})
export class AddPublisherDialogComponent implements OnInit {

  form: FormGroup = this.createFormGroup();

  constructor(public dialogRef: MatDialogRef<AddPublisherDialogComponent>,
              private publisherService: PublisherService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addPublisher() {
    const parsedDate = new Date(this.form.get('established')?.value);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    var formattedDate = `${day}.${month}.${year}.`;    
    var publisher: PublisherRequest = {
      ...this.form.getRawValue(),
      established: formattedDate
    };    
    this.publisherService
      .addPublisher(publisher)
      .subscribe({
        next: (res: Publisher) => {
          this.dialogRef.close({ data: res});
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  onCancelClick() {  
    this.dialogRef.close(false);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      established: new FormControl('', Validators.required),
    });
  }

}
