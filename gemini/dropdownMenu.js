/* global gemini */

var pathTo = require('./utils').pathTo;

const DROPDOWN_MENU_SELECTOR = '[class^="DropdownMenu-container"]';
const DROPDOWN_MENU_CAPTION_SELECTOR = '[class^="DropdownMenu-caption"]';

var applyTest = testSuite =>
  testSuite
    .setCaptureElements('#test-element')
    .before((actions, find) => {
      this.dropdownMenu = find(DROPDOWN_MENU_SELECTOR);
      this.captionElement = find(DROPDOWN_MENU_CAPTION_SELECTOR);
    })
    .capture('plain')
    .capture('clickAfterClickedOnCaption', (actions, find) => {
      actions.click(this.captionElement).click(this.captionElement);
    })
    .capture('clicked', actions => {
      actions.click(this.captionElement);
    })
    .capture('clickedOutside', (actions, find) => {
      actions.click(find('body'), 0, [1, 1]);
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture('enterPress', (actions, find) => {
      actions.sendKeys(gemini.SPACE);
    })
    .capture('escapePress', (actions, find) => {
      actions.sendKeys(gemini.ESCAPE);
    });

gemini.suite('DropdownMenu simple', suite => {
  suite.setUrl(pathTo('DropdownMenu', 'Simple example'));
  applyTest(suite);
});
