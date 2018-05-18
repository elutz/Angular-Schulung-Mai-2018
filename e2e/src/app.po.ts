import { browser, by, element, $, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('br-root h1')).getText();
  }

  getBooksCount() {
    return $$('br-book').count();
  }

  getBooksCount2() {
    return $('br-book').all('').count();
  }

}
