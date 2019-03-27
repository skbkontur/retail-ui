/* global gemini */

var renderStory = require('./utils').renderStory;

const DROPDOWN_MENU_SELECTOR = '[class^="DropdownMenu-container"]';
const CAPTION_SELECTOR = '[class^="PopupMenu-caption"]';

var applyTest = testSuite =>
  testSuite
    .setCaptureElements('#test-element')
    .before((actions, find) => {
      this.dropdownMenu = find(DROPDOWN_MENU_SELECTOR);
      this.captionElement = find(CAPTION_SELECTOR);
    })
    .capture('plain')
    .capture('clickAfterClickedOnCaption', (actions, find) => {
      actions.click(this.captionElement).click(this.captionElement);
    })
    .capture('clicked', actions => {
      actions.click(this.captionElement);
    })
    .capture('clickedOutside', (actions, find) => {
      actions.click(find('body'));
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture('enterPress', (actions, find) => {
      actions.sendKeys(gemini.ENTER);
    })
    .capture('escapePress', (actions, find) => {
      actions.sendKeys(gemini.ESCAPE);
    });

gemini.suite('DropdownMenu', suite => {
  gemini.suite('Simple', suite => {
    suite.before(renderStory('DropdownMenu', 'Simple example'));
    applyTest(suite);
  });

  gemini.suite('With header and footer', suite => {
    suite
      .before(renderStory('DropdownMenu', 'With header and footer'))
      .before((actions, find) => {
        this.captionElement = find(CAPTION_SELECTOR);
      })
      .setCaptureElements('html')
      .capture('clicked', actions => {
        actions.click(this.captionElement);
      })
      .capture('scrolled by 100', actions => {
        actions.executeJS(function(window) {
          var scrollContainer = window.document.querySelector('[class^="ScrollContainer-inner"]');
          scrollContainer.scrollTop += 100;
        });
      })
      .capture('scrolled down to bottom', actions => {
        actions.executeJS(function(window) {
          var scrollContainer = window.document.querySelector('[class^="ScrollContainer-inner"]');
          scrollContainer.scrollTop += scrollContainer.scrollHeight;
        });
      });
  });
});
