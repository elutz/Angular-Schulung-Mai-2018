import { BookRatingService } from './../shared/book-rating.service';
import { Book } from './../shared/book';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  // perfomance Optimierung, aber Tests beachten!!! dafür ausschalten, siehe Schulungs-repo auf github
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  // rs = new BookRatingService();
  // private rs: BookRatingService; -> besser im Constructor, siehe unten

  @Input() book: Book;
  @Input() isOdd: boolean;
  @Output() rate = new EventEmitter<Book>();

  constructor(public rs: BookRatingService) {
    // this.rs = rs;
  }

  ngOnInit() {}

  rateUp() {
    const newBook = this.rs.rateUp(this.book);
    this.rate.emit(newBook);
  }
  rateDown() {
    const newBook = this.rs.rateDown(this.book);
    this.rate.emit(newBook);
  }
}
