import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {

  email: FormControl = new FormControl('');
  
  constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
              private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.authService
      .sendPasswordResetRequest({ email: this.email.value })      
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.messageService.showMessage(err.error.message, MessageType.ERROR);
        },
      });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
