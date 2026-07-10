class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async closePopup() {
    await this.page.locator('.crossIcon').click().catch(() => {});
  }

  async viewProfile() {
    await this.page.getByRole('link', { name: 'View profile' }).click();
  }

  async updateResume() {
    await this.page.getByRole('button', { name: 'Update resume' }).click();
  }

  async editTheme() {
    await this.page.getByRole('emphasis').filter({ hasText: 'editOneTheme' }).click().catch(() => {});
  }

  async save() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async closeEditDrawer() {
    await this.page.locator('.lightbox.profileEditDrawer.profileUpdatedProLayer > .crossLayer > .icon').click().catch(() => {});
  }
}

module.exports = ProfilePage;
