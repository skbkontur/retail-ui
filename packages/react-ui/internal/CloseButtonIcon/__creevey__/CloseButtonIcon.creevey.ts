import { story, kind, test } from 'creevey';

const clickThenTAB = (clickDataTid: string) => {
  test(clickDataTid, async function () {
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid="${clickDataTid}"] input` }))
      .pause(500)
      .perform();
    const firstFocus = await this.takeScreenshot();
    await this.browser
      .actions({
        async: undefined,
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .pause(500)
      .perform();
    const secondFocus = await this.takeScreenshot();

    await this.expect({ firstFocus, secondFocus }).to.matchImages();
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
