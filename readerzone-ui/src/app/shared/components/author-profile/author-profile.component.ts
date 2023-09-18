import { Component, OnInit } from '@angular/core';
import { Author } from '../../model/Author';
import { BookData } from '../../model/BookData';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author-service/author.service';
import { MessageService, MessageType } from '../../services/message-service/message.service';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {

  author!: Author;
  booksData: BookData[] = [];

  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private authorService: AuthorService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.authorService
        .getAuthor(+id)
        .subscribe({
          next: (res: Author) => {
            this.author = res;            
            this.loading = false;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
            this.router.navigate(['/shop']);
          }
        });
      this.authorService
        .getAuthorBooks(+id)
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
