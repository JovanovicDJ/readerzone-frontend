import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MessageType } from '../../services/message-service/message.service';
import { PublisherService } from '../../services/publisher-service/publisher.service';
import { Publisher } from '../../model/Publisher';
import { BookData } from '../../model/BookData';

@Component({
  selector: 'app-publisher-profile',
  templateUrl: './publisher-profile.component.html',
  styleUrls: ['./publisher-profile.component.css']
})
export class PublisherProfileComponent implements OnInit {

  publisher!: Publisher;
  booksData: BookData[] = [];

  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private publisherService: PublisherService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.publisherService
        .getPublisher(+id)
        .subscribe({
          next: (res: Publisher) => {
            this.publisher = res;            
            this.loading = false;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
            this.router.navigate(['/shop']);
          }
        });
      this.publisherService
        .getPublisherBooks(+id)
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

}
