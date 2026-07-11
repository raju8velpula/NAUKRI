class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url = 'https://www.naukri.com/') {
    await this.page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    // try to close any initial popups that may block interactions
    await this.page.locator('.crossIcon').first().click({ timeout: 2000 }).catch(() => {});
    await this.page.locator('body').click({ timeout: 2000 }).catch(() => {});
  }

  async clickLogin() {
    // Try several selectors to find the login link/button
    await this.page.locator(`[title="Jobseeker Login"]`).click();
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
