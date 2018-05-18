import { AppPage } from './app.po';
import { browser, $, $$ } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tolle Bücher! (Arrrggghhh, cat content)');
  });

  it('should render 4 books', () => {
    // browser.get('/');
    // const count = $$('br-book').count();

    // browser.sleep(5000);

    expect(page.getBooksCount()).toBe(4);
    // expect(page.getBooksCount2()).toBe(4);
    // const count2 = $('br-book').all('').count();
    // expect(count2).toBe(4);
  });
});
