/* global gemini */

var renderStory = require('./utils').renderStory;

const BUTTON_SELECTOR = '[class^="Button-root"]';
const RADIO_SELECTOR = '[class^="Radio-root"]';

gemini.suite('RadioGroup', suite => {
  suite
    .before(renderStory('RadioGroup', 'vertical'))
    .setCaptureElements('#RadioGroup-wrap')
    .capture('plain')
    .capture('hovered', (actions, find) => {
      actions.mouseMove(find(RADIO_SELECTOR));
    })
    .capture('clicked', (actions, find) => {
      actions.click(find(RADIO_SELECTOR));
    })
    .capture('mouseLeave', (actions, find) => {
      actions.click(find(BUTTON_SELECTOR), 0, [0, 0]);
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
