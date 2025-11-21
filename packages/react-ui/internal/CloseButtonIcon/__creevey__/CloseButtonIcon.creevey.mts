import { story, kind, test } from 'creevey';
import 'creevey/playwright';

const clickThenTAB = (clickDataTid: string) => {
  test(clickDataTid, async (context) => {
    const page = context.webdriver;
    await page.locator(`[data-tid="${clickDataTid}"] input`).click();
    await page.waitForTimeout(500);
    const firstFocus = await context.takeScreenshot();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
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
