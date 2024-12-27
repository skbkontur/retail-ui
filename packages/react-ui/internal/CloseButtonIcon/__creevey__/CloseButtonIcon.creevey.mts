import { story, kind, test } from 'creevey';
import { Key } from 'selenium-webdriver';

const clickThenTAB = (clickDataTid: string) => {
  test(clickDataTid, async (context) => {
    await context.webdriver
      .actions({
        bridge: true,
      })
      .click(context.webdriver.findElement({ css: `[data-tid="${clickDataTid}"] input` }))
      .pause(500)
      .perform();
    const firstFocus = await context.takeScreenshot();
    await context.webdriver
      .actions({
        bridge: true,
      })
      .sendKeys(Key.TAB)
      .pause(500)
      .perform();
    const secondFocus = await context.takeScreenshot();

    await context.matchImages({ firstFocus, secondFocus });
  });
};

kind('CloseButtonIcon', () => {
  story('Tabbable', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: {
        'do not pass on teamcity': { in: ['firefox2022', 'firefox2022Dark'] },
        'only available in theme2022': { in: /^(?!\b.*2022.*\b)/ },
      },
    });
    clickThenTAB('notTabbable');
    clickThenTAB('tabbable');
  });
  story('Side', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'only available in theme2022': { in: /^(?!\b.*2022.*\b)/ } },
    });
  });
  story('VerticalAlign', ({ setStoryParameters }) => {
    setStoryParameters({
      skip: { 'only available in theme2022': { in: /^(?!\b.*2022.*\b)/ } },
    });
  });
});
