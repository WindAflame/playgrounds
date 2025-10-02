import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.models';
import { RoutingsContracts } from '../app.routing.contracts';
import * as firebase from 'firebase';

@Injectable()
export class BookService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>()

  constructor() { }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    firebase.database().ref(RoutingsContracts.BookList).set(this.books);
  }

  getBooks(){
    firebase.database().ref(RoutingsContracts.BookList)
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getBook(id: number){
    return new Promise(
      (res,rej) => {
        firebase.database().ref(RoutingsContracts.BookList + '/' + id).once('value').then(
          (data) => { res(data.val()); },
          (err) => { rej(err); }
        );
      }
    );
  }

  createBook(book: Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    if (book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => { console.log("Photo supprimé"); }
      ).catch(
        (err) => { console.log("Fichier non trouvé : " + err) }
      );
    }
    const index = this.books.findIndex(
      (item) => {
        if (item === book){ return true; }
      }
    );
    this.books.splice(index, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File){
    return new Promise(
      (res,rej) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child( 'images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => { console.log("Chargement ..."); },
          (err) =>{ console.log("Erreur de chargement : " + err); rej(); },
          () => { res(upload.snapshot.downloadURL); } 
        );
      }
    );
  }

}
