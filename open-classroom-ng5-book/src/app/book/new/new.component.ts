import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { BookConstracts } from '../../contracts/book.contracts';
import { RoutingsContracts as Path} from '../../app.routing.contracts';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class BookNewComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading: boolean = false;
  fileUrl: string;
  fileUploaded: boolean =  false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]]
    })
  }

  onSaveBook(){
    const title = this.bookForm.get(BookConstracts.Title).value;
    const author = this.bookForm.get(BookConstracts.Author).value;
    const newBook = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '' ) {
      newBook.photo = this.fileUrl;
    }
    this.bookService.createBook(newBook);
    this.router.navigate( [Path.BookList,] )
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event) { this.onUploadFile(event.target.files[0]); }

}
