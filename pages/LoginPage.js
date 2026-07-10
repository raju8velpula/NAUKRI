class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.naukri.com/', { waitUntil: 'load' });
    // try to close any initial popups that may block interactions
    await this.page.locator('.crossIcon').first().click({ timeout: 2000 }).catch(() => {});
    await this.page.locator('body').click({ timeout: 2000 }).catch(() => {});
  }

  async clickLogin() {
    // Try several selectors to find the login link/button
    const attempts = [
      this.page.getByRole('link', { name: 'Login', exact: true }),
      this.page.locator('a:has-text("Login")'),
      this.page.locator('text=Login'),
      this.page.locator('text=Log in')
    ];

    for (const locator of attempts) {
      try {
        await locator.first().waitFor({ timeout: 3000 });
        await locator.first().click({ timeout: 5000 });
        return;
      } catch (e) {
        // try next
      }
    }

    // If we reach here, nothing clicked — capture screenshot for debugging
    await this.page.screenshot({ path: 'login-click-failure.png', fullPage: true }).catch(() => {});
    throw new Error('Unable to find or click the Login link/button. Screenshot saved to login-click-failure.png');
  }

  async enterEmail(email) {
    const el = this.page.getByRole('textbox', { name: 'Enter your active Email ID /' });
    await el.click();
    await el.fill(email);
  }

  async enterPassword(password) {
    const el = this.page.getByRole('textbox', { name: 'Enter your password' });
    await el.click();
    await el.fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Login', exact: true }).click();
  }
}

module.exports = LoginPage;
