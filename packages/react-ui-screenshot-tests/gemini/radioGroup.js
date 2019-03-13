/* global gemini */

var renderStory = require('./utils').renderStory;

const FIRST_RADIO_SELECTOR = '[data-comp-name="RadioGroup"] > span > label';

gemini.suite('RadioGroup', suite => {
  suite
    .before(renderStory('RadioGroup', 'vertical'))
    .setCaptureElements('#RadioGroup-wrap')
    .capture('plain')
    .capture('hovered', (actions, find) => {
      actions.mouseMove(find(FIRST_RADIO_SELECTOR));
    })
    .capture('clicked', (actions, find) => {
      actions.click(find(FIRST_RADIO_SELECTOR));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.click(find('[data-tid="JustButton"]'));
    })
    .capture('tabPress', (actions, find) => {
      actions.sendKeys(gemini.TAB);
    })
    .capture('arrow_down', (actions, find) => {
      actions.sendKeys(gemini.DOWN);
    });
});

gemini.suite('RadioGroup inline', suite => {
  suite
    .before(renderStory('RadioGroup', 'inline'))
    .setCaptureElements('#RadioGroup-wrap')
    .capture('RadioGroup inline');
});
