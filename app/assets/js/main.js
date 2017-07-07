const lmtSwitch = require('./_switch.js');
$(document).ready(() => {
  // Use clipboard js for copying text to clipboard on click
  // eslint-disable-next-line no-new
  new Clipboard('.copy-clipboard-link');
  lmtSwitch.init();
  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  const $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  // eslint-disable-next-line no-new
  new GOVUK.SelectionButtons($blockLabels);
});
