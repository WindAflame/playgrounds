import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.models';
import { BookService } from '../../services/book.service';
import { RoutingsContracts as Path} from '../../app.routing.contracts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    this.bookService.getBook(+id).then(
      (book: Book) => { this.book = book; }
    )
  }

  onBack(){ this.router.navigate( [Path.BookList] ); }

}
