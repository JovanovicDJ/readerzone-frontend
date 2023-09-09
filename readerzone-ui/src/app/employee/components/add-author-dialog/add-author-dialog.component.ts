import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/model/Author';
import { AuthorService } from 'src/app/shared/services/author-service/author.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent implements OnInit {

  form: FormGroup = this.createFormGroup();
  
  constructor(public dialogRef: MatDialogRef<AddAuthorDialogComponent>,
              private authorService: AuthorService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addAuthor() {
    this.authorService
      .addAuthor(this.form.getRawValue())
      .subscribe({
        next: (res: Author) => {
          this.dialogRef.close({ data: res});
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      })
  }

  onCancelClick() {  
    this.dialogRef.close(false);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
    });
  }

}
