/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('DatePicker', suite => {
  suite
    .before(renderStory('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('opened', (actions, find) => {
      actions.click(find('[class^="DatePicker-root"]'));
    });
});

gemini.suite('DateSelect in DatePicker', suite => {
  suite
    .before(renderStory('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('DateSelect month', (actions, find) => {
      const selector =
        '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]';
      actions.click(find('[class^="DatePicker-root"]'));
      actions.waitForElementToShow(selector);
      actions.click(find(selector));
    })
    .capture('DateSelect year', (actions, find) => {
      const selector =
        '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]';

      actions.click(find(selector));
    })
    .skip.in('firefox', 'в firefox почему-то закрывается дэйтпикер после клика на DateSelect');
});

gemini.suite('DateSelect with disabled items', suite => {
  suite
    .before(renderStory('DatePicker', 'DatePicker with min max date'))
    .setCaptureElements(['[class^="Picker-root"]', '#test-element'])
    .capture('DateSelect months', (actions, find) => {
      const selector =
        '[class^="MonthView-month"]:first-child [class^="MonthView-headerMonth"] [class^="DateSelect-caption"]';
      actions.click(find('[class^="DatePicker-root"]'));
      actions.waitForElementToShow(selector);
      actions.click(find(selector));
    })
    .capture('DateSelect years', (actions, find) => {
      const selector =
        '[class^="MonthView-month"]:first-child [class^="MonthView-headerYear"] [class^="DateSelect-caption"]';

      actions.click(find(selector));
    })
    .skip.in('firefox', 'в firefox почему-то закрывается дэйтпикер после клика на DateSelect');
});
