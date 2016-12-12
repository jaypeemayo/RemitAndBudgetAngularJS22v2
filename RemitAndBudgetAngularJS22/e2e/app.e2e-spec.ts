

describe('Remit and Budget E2E Test', function () {

  let expectedMsg = 'Remit and Budget';


  beforeEach(function () {
    browser.get('');
  });

  // it('should display: ' + expectedMsg, function () {
  //   expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
  // });

  it('should display title: ' + expectedMsg, function () {
    expect(browser.getTitle()).toEqual('Remit and Budget');
  });

  it('should display title: ' + expectedMsg, function () {
    const userName = 'oyams90';
    const passWord ='123456';
    var username = element.all(by.css('input')).get(0);
    username.clear();
    username.sendKeys(userName);

    var password = element.all(by.css('input')).get(1);
    password.clear();
    password.sendKeys(passWord);

    username.getOuterHtml().then(o=>{
      console.log(o);
      expect(o).toContain(userName);});
    password.getOuterHtml().then(o=>{
      console.log(o);
      expect(o).toContain(passWord)});



    //var button = element(by.css('[routerLink=/dashboard]'));
    var button = element(by.css('button'));
    button.click();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('/dashboard');
    browser.getCurrentUrl().then(o=>console.log(o));

    element.all(by.css('button')).get(1).click();

    expect(browser.getCurrentUrl()).toContain('/transaction');
    browser.getCurrentUrl().then(o=>console.log(o));

    element(by.css('.glyphicon-plus')).click();
    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('/register-transaction');
    browser.getCurrentUrl().then(o=>console.log(o));


    element(by.name('action')).sendKeys('Remitances');
    element(by.name('amount')).sendKeys('10');
    element(by.name('month')).sendKeys('12/15/2016');
    element(by.name('description')).sendKeys('this is a description');

    element(by.css('[type="submit"]')).click();
    browser.switchTo().alert().accept();

    browser.sleep(5000);
  });
});
