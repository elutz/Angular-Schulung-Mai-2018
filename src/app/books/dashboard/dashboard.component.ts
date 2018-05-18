import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component, OnInit, NgModule, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];
  @Input() url: string;
  d = new Date();

  constructor(private bs: BookStoreService) { }

  /* Lifecycle hook */
  ngOnInit() {
    this.url = 'https://www.agendo.de';

    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  updateSortList(book: Book) {
    // Buch aus Liste entfernen
    const cleanedList = this.books.filter(
      b => b.isbn !== book.isbn
    );

    // Neues Buch einfügen und
    // Liste sortieren
    this.books = [...cleanedList, book].sort((a, b) => b.rating - a.rating);
  }

  addBook(book: Book) {

    this.bs.create(book).subscribe(() => {
      this.updateSortList(book);

    });
  }

}
