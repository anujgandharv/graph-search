import { SigAppPage } from './app.po';

describe('sig-app App', () => {
  let page: SigAppPage;

  beforeEach(() => {
    page = new SigAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
