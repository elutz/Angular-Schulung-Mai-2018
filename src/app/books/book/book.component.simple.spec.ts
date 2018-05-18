import { BookRatingService } from './../shared/book-rating.service';
import { BookComponent } from './book.component';
import { Book } from '../shared/book';
describe('Book Component Simple Test', () => {

  let component: BookComponent;

  beforeEach(() => {
    component = new BookComponent({} as BookRatingService);
  });

  it('should forward rateup to service', () => {

    component.rs = {
      rateUp: (book: Book) => book
    } as BookRatingService;  // ich brauche hier nur rateUp vom BookRatingService

    spyOn(component.rs, 'rateUp').and.callThrough();

    component.rateUp();

    expect(component.rs.rateUp).toHaveBeenCalled();
  });

  it('should throw "rate" event for rateup', () => {

    // Achtung, das ist hier ein Roundtrip durch BookComponent und BookRatingService

    component.rs = {
      rateUp: (book: Book) => book  // 1. Oder hier konkretes Buch erzeugen
    } as BookRatingService;  // ich brauche hier nur rateUp vom BookRatingService

    component.book = {
      author: '', title: '', isbn: '', description: '', rating: 1
    } ;

    component.rate.subscribe((_book: Book) => {
      expect(_book).toBe(component.book); // 2. und dann hier auf das erzeugte Buch testen
    });
    // expect(true).toBeFalsy();
  });
});

