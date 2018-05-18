
import { Book } from './../shared/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private client: HttpClient) { }

  getAll(): Observable<Book[]> {  // TODO: Interface für API-response anlegen
    return this.client.get<any[]>('https://api.angular.schule/books').pipe(
      map(apiBooks => {
        return apiBooks.map(book => {
          return {
            isbn: book.isbn,
            title: book.title,
            description: book.description,
            author: book.authors.join(', '),
            rating: book.rating
          };
        });

      })
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.client.get<any>('https://api.angular.schule/book/' + isbn);
  }

  create(book: Book): Observable<any> {

    const apiBook = {
      ...book, authors: [book.author]
    };

    return this.client.post('https://api.angular.schule/book', apiBook, { responseType: 'text' });
  }

  getAllStatic(): Book[] {
    return [
      { title: 'Angular ', isbn: '0000', rating: 5, description: 'ausm Store: Das ist ein tolles Buch', author: 'Ferdinand et al' },
      { title: 'React', isbn: '12345', rating: 4, description: 'Store: Zuckerbergs Kram', author: 'Facebook' },
      { title: 'Vue', isbn: '23456', rating: 5, description: '', author: 'wer isn das eigentlich?' },
      { title: 'Ember', isbn: '23457', rating: 2, description: '', author: 'wer isn das eigentlich?' }
    ];
  }
}
