import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/model/Customer';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { ImageService } from 'src/app/shared/services/image-service/image.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-customer-edit-dialog',
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.css']
})
export class CustomerEditDialogComponent implements OnInit {

  customer!: Customer;

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  form: FormGroup = this.createFormGroup();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer,
              public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
              private imageService: ImageService,
              private customerService: CustomerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.customer = JSON.parse(JSON.stringify(this.data));
  }

  openFileInput() {
    this.fileInput.nativeElement.click();    
  } 

  uploadImage() {
    const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
    const formData = new FormData();
    const selectedFiles = this.fileInput.nativeElement.files;

    if (selectedFiles.length === 1) {
      const selectedFile = this.fileInput.nativeElement.files[0];
      if (selectedFile.type.startsWith('image/') && selectedFile.size <= MAX_IMAGE_SIZE_BYTES) {                
        formData.append('imageFile', selectedFile);              
        this.imageService
          .postImage(formData)
          .subscribe({
            next: (response) => {
              this.customer.imageUrl = response.url;
            },
            error: (error) => {            
              this.messageService.showMessage(error.err.detail, MessageType.ERROR);
            }
        });

      } else {        
        if (!selectedFile.type.startsWith('image/')) {
          this.messageService.showMessage('Invalid file type. Please select an image.', MessageType.WARNING);
        } else {          
          this.messageService.showMessage('File size exceeds the maximum allowed size.', MessageType.WARNING);
        }
      }
    } else {
      this.messageService.showMessage('Please select one image file.', MessageType.WARNING);
    }
  }

  editProfile() {
    this.editCustomer();
    this.customerService
      .updateCustomer({ ...this.form.getRawValue(), 'imageUrl': this.customer.imageUrl })
      .subscribe({
        next: () => {
          this.dialogRef.close({ data: this.customer});
        },
        error: (error) => {
          this.messageService.showMessage(error.err.detail, MessageType.ERROR);
        }
      });

  }

  editCustomer() {
    this.customer.userAccount.username = this.form.get('username')?.value;
    this.customer.name = this.form.get('name')?.value;
    this.customer.surname = this.form.get('surname')?.value;
    this.customer.phoneNumber = this.form.get('phoneNumber')?.value;
    this.customer.address.street = this.form.get('street')?.value;
    this.customer.address.number = this.form.get('number')?.value;
    this.customer.address.city = this.form.get('city')?.value;
    this.customer.address.city = this.form.get('city')?.value;
    this.customer.address.postalCode = this.form.get('postalCode')?.value;
    this.customer.address.country = this.form.get('country')?.value;
  }

  onCancelClick() {  
    this.dialogRef.close();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(this.data.userAccount.username, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      surname: new FormControl(this.data.surname, Validators.required),
      phoneNumber: new FormControl(this.data.phoneNumber, [Validators.pattern('^[0-9]{9,12}$'), Validators.required]),
      street: new FormControl(this.data.address.street, Validators.required),
      number: new FormControl(this.data.address.number),
      city: new FormControl(this.data.address.city, Validators.required),
      postalCode: new FormControl(this.data.address.postalCode, Validators.required),
      country: new FormControl(this.data.address.country, Validators.required)
    });
  }

}
