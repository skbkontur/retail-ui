Promise.resolve([
  'button--use',
  'button--warning',
  'button--error',
  'button--focused',
  'button--arrow',
  'button--arrow-left',
  'button--arrow-size',
  'button--borderless',
  'button--size',
  'button--loading',
  'button--narrow',
  'button--align',
  'button--link',
  'button--icon',
  'button--disabled',
  'button--multiline-text-with-link-button',
  'button--checked',
  'button--different-prioritization',
  'button--icon-different-content',
  'button--text-styles-reset',
]).then((stories) => {
  stories.forEach((id) => {
    const [kind, story] = id.split('--');
    describe(kind, async () => {
      it(story, async function () {
        await this.browser.selectStory(`${kind}--${story}`);
        await this.browser.assertView('$static', '#test-element');
      });
    });
  });
});
