const { Before, After, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const ProfilePage = require('../../pages/ProfilePage');

setDefaultTimeout(60 * 1000);

let browser, context, page, loginPage, profilePage;

Before(async function () {
  browser = await chromium.launch({ headless: true,
    channel: 'chrome'
   });
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  profilePage = new ProfilePage(page);
  this.page = page;
});

After(async function () {
  if (browser) await browser.close();
});

Given('I open the Naukri homepage', async function () {
  await loginPage.goto("https://www.naukri.com/");
});

When('I click the Login link', async function () {
  await loginPage.clickLogin();
});

When('I enter email {string}', async function (email) {
  await loginPage.enterEmail(email);
});

When('I enter password {string}', async function (password) {
  await loginPage.enterPassword(password);
});

When('I submit the login form', async function () {
  await loginPage.submit();
});

Then('I should be logged in', async function () {
  // basic check: View profile link exists
  await page.waitForSelector('a:has-text("View profile")', { timeout: 10000 });
});

When('I navigate to View profile', async function () {
  await profilePage.closePopup();
  await profilePage.viewProfile();
});

When('I click Update resume', async function () {
  await profilePage.updateResume();
});

When('I select edit theme', async function () {
  await profilePage.editTheme();
});

When('I save the profile', async function () {
  await profilePage.save();
  await profilePage.closeEditDrawer();
});

Then('I should see {string}', async function (text) {
  await page.getByText(text).waitFor({ timeout: 10000 });
});
