import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    component.book = { isbn: '1234', title: '', description: '',  author: '', rating: 4 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct rating', () => {

    const ratingBox = fixture
    .debugElement
    .query(By.css('.testing-rating-box'));

    expect(ratingBox.nativeElement.textContent).toBe('4');

    component.book = { ...component.book, rating: 5};
    fixture.detectChanges();  // muss hier manuell aufgerufen werden
    expect(ratingBox.nativeElement.textContent).toBe('5');

  });
});
