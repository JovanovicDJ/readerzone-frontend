import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookRequest } from '../../model/BookRequest';

@Component({
  selector: 'app-image-proba',
  templateUrl: './image-proba.component.html',
  styleUrls: ['./image-proba.component.css']
})
export class ImageProbaComponent implements OnInit {

  placeholder: string = '../../../../assets/placeholder.png';
  imageSelected: boolean = false;

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
  }

  openFileInput() {
    this.fileInput.nativeElement.click();    
  } 

  uploadImage() {
    const formData = new FormData();
    formData.append('imageFile', this.fileInput.nativeElement.files[0]);
    this.http.post<any>(`${environment.baseUrl}/image/upload`, formData).subscribe(
      (response) => {        
        this.placeholder = response.url;
        this.imageSelected = true;
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  addBook(): void {
    if (this.imageSelected) {          

      let book: BookRequest = {
        title: "Norwegian Wood",
        authorIds: [14],
        isbn: "978-0-307-27029-7",
        publishingDate: "04.10.1987.",
        genres: ["Literature", "Romance"],
        stocks: 90,
        pages: 296,
        language: "English",
        weight: 350,
        height: 30,
        width: 20,
        price: 11.49,
        publisherId: 7,
        imageUrl: this.placeholder
    }

      this.http.post<any>(`${environment.baseUrl}/book`, book).subscribe(
        (response) => {
          console.log(response);          
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

}
