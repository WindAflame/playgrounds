import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.models';
import { RoutingsContracts as Path } from '../../app.routing.contracts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];
  booksSubscription: Subscription;

  constructor(
    private booksService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => { this.books = books; }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook(){ this.router.navigate( [Path.BookNew] ); }
  onDeleteBook(book: Book){  this.booksService.removeBook(book); }
  onViewBook(id: number){ this.router.navigate( [Path.BookList, id]); }

  ngOnDestroy(): void { this.booksSubscription.unsubscribe(); }

}
