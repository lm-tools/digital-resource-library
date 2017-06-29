const Page = require('./page');
class DetailPage extends Page {

  visit(id) {
    return this.browser.visit(`/resources/${id}`);
  }

  categoryText() {
    return this.extractText('category');
  }

  categoryLink() {
    return this.extractLink('category').href;
  }

  link() {
    return this.extractLink('link');
  }

  header() {
    return this.extractText('header');
  }

  summary() {
    return this.extractText('summary');
  }

  journalMessage() {
    return this.extractText('journal-message');
  }

}
module.exports = DetailPage;
