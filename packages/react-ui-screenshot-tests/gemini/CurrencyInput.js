const renderStory = require('./utils').renderStory;

gemini.suite('CurrencyInput', () => {
  gemini.suite('Sample', suite => {
    suite
      .before(renderStory('CurrencyInput', 'Sample'))
      .setCaptureElements('#test-element')
      .ignoreElements('button')
      .capture('Plain')
      .capture('Focus', (actions, find) => {
        actions.focus(find('[data-comp-name*="CurrencyInput"] input'));
      })
      .capture('Input value', (actions, find) => {
        '1234'.split('').forEach(char => {
          actions.wait(500);
          actions.sendKeys(find('[data-comp-name*="CurrencyInput"] input'), char);
        });
      })
      .capture('External focus and input', (actions, find) => {
        actions.click(find('button'));
        '5678'.split('').forEach(char => {
          actions.wait(500);
          actions.sendKeys(find('[data-comp-name*="CurrencyInput"] input'), char);
        });
      });
  });
});
