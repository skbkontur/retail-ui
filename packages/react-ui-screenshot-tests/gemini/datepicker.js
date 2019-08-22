/* global gemini */

var renderStory = require('./utils').renderStory;

gemini.suite('DatePicker', suite => {
  suite
    .before(renderStory('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[data-comp-name~="Picker"]', '#test-element'])
    .capture('opened', (actions, find) => {
      actions.click(find('[data-comp-name~="DatePicker"]'));
    });
});

gemini.suite('DateSelect in DatePicker', suite => {
  suite
    .before(renderStory('DatePicker', 'with mouseevent handlers'))
    .setCaptureElements(['[data-comp-name~="Picker"]', '#test-element'])
    .capture('DateSelect month', (actions, find) => {
      const selector =
        '[class^="MonthView-module-month"]:first-child [class^="MonthView-module-headerMonth"] [class^="DateSelect-module-caption"]';
      actions.click(find('[data-comp-name~="DatePicker"]'));
      actions.waitForElementToShow(selector);
      actions.click(find(selector));
    })
    .capture('DateSelect year', (actions, find) => {
      const selector =
        '[data-comp-name~="Month"]:first-child [class^="MonthView-module-headerYear"] [class^="DateSelect-module-caption"]';

      actions.click(find(selector));
    })
    .skip.in('firefox', 'в firefox почему-то закрывается дэйтпикер после клика на DateSelect');
});

gemini.suite('DateSelect with disabled items', suite => {
  suite
    .before(renderStory('DatePicker', 'DatePicker with min max date'))
    .setCaptureElements(['[data-comp-name~="Picker"]', '#test-element'])
    .capture('DateSelect months', (actions, find) => {
      const selector =
        '[data-comp-name~="Month"]:first-child [class^="MonthView-module-headerMonth"] [class^="DateSelect-module-caption"]';
      actions.click(find('[data-comp-name~="DatePicker"]'));
      actions.waitForElementToShow(selector);
      actions.click(find(selector));
    })
    .capture('DateSelect years', (actions, find) => {
      const selector =
        '[data-comp-name~="Month"]:first-child [class^="MonthView-module-headerYear"] [class^="DateSelect-module-caption"]';

      actions.click(find(selector));
    })
    .skip.in('firefox', 'в firefox почему-то закрывается дэйтпикер после клика на DateSelect');
});
