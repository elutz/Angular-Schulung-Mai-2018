import { Book } from './book';
import { BookRatingService } from './book-rating.service';
describe('Book Rating Service', () => {

  let brs: BookRatingService;
  let book: Book;

  beforeEach(() => {
    brs = new BookRatingService();
    book = { isbn: '', author: '', title: '', rating: 3, description: '' };
  });

  it('should increase rating by one', () => {
    const ratedbook = brs.rateUp(book);
    expect(ratedbook.rating).toBe(4);
  });

  it('should decrease rating by one', () => {
    const ratedbook = brs.rateDown(book);
    expect(ratedbook.rating).toBe(2);
  });

  it('should not be greater than 5', () => {
    book.rating = 5;
    const ratedbook = brs.rateUp(book);
    expect(ratedbook.rating).toBe(5);
  });

  it('should not be smaller than 0', () => {
    book.rating = 0;
    const ratedbook = brs.rateDown(book);
    expect(ratedbook.rating).toBe(0);
  });
});
