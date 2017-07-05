const Page = require('./page');
class DetailPage extends Page {

  visit(id, fromSearch) {
    return this.browser.visit(this.routes.detailsUrl(id, fromSearch));
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

  copyClipboardJournalContent() {
    return this.extractAttributeValue('copy-clipboard-journal-link', 'data-clipboard-text');
  }

}
module.exports = DetailPage;
