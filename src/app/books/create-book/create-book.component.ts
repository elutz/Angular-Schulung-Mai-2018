import { Book } from './../shared/book';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, filter, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();
  // destroy$: Subject<any> = new Subject();
  isbn$: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.isbn$ =
      this.bookForm.valueChanges
        .pipe(
          // siehe rxmarbles.com
          map(value => value.isbn3),
          filter(isbn => isbn.length >= 3),
          distinctUntilChanged(),
          debounceTime(1000)
          // takeUntil(this.destroy$)
        );

        // subscribe geht hier nicht da es eine Subscription zurückgibt
        // wir wollen aber ein Observable (siehe isbn$)
        // .subscribe(
        //   value => console.log(value)
        // );
  }

  // ngOnDestroy() {
  //   this.destroy$.next();
  // }

  submitForm() {
    console.log(this.bookForm.value);

    const value = this.bookForm.value;
    const newBook: Book = {
      isbn: value.isbn,
      title: value.title,
      description: value.description,
      author: value.author,
      rating: 1
    };

    this.create.emit(newBook);

    this.bookForm.reset();
  }

}
