/* global gemini */
var renderStory = require('./utils').renderStory;

var TEST_CONTAINER = 'html';
var BUTTONS = '#buttons';

var initTest = (suite, showLongItems) =>
  suite
    .before(renderStory('DropdownContainer', 'various aligns, portals, items and scrolls'))
    .setCaptureElements(TEST_CONTAINER)
    .ignoreElements(BUTTONS)
    .before((actions, find) => {
      if (showLongItems) {
        actions.click(find(BUTTONS + ' button'));
      }
    });

var pageScrollTest = suite =>
  suite.capture('shot', actions => {
    actions.executeJS(function(window) {
      var doc = window.document.documentElement;
      doc.scrollTop = doc.scrollHeight - doc.offsetHeight;
      doc.scrollLeft = doc.scrollWidth - doc.offsetWidth;
    });
  });

var innerScrollTest = suite =>
  suite
    .capture('shot', actions => {
      actions.executeJS(function(window) {
        var innerScroll = window.document.querySelector('#inner-scroll');
        innerScroll.scrollTop = innerScroll.scrollHeight - innerScroll.offsetHeight;
        innerScroll.scrollLeft = innerScroll.scrollWidth - innerScroll.offsetWidth;
      });
    })
    .skip.in('ie11', 'ie иногда не до конца скролит элемент (разница в пару px)');

gemini.suite('DropdownContainer', () => {
  gemini.suite('short Items', () => {
    gemini.suite('items', suite => {
      initTest(suite).capture('shot');
    });

    gemini.suite('page scroll', suite => {
      pageScrollTest(initTest(suite));
    });

    gemini.suite('inner scroll', suite => {
      innerScrollTest(initTest(suite));
    });
  });

  gemini.suite('long Items', () => {
    gemini.suite('items', suite => {
      initTest(suite, true).capture('shot');
    });

    gemini.suite('page scroll', suite => {
      pageScrollTest(initTest(suite, true));
    });

    gemini.suite('inner scroll', suite => {
      innerScrollTest(initTest(suite, true));
    });
  });
});
