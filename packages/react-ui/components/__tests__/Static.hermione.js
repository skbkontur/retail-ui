const { stories } = require('./stories.json');

const sanitizeForFileName = (str) => str.replace(/[^\w\s]/g, '');

const SKIPS = [
  'zindex--modal-with-tooltip-in-loader-story',
  'nested-elements-in-loader-story',
  'themeshowcase--playground',
  'combobox--nested-combo-boxes',
  'combobox--with-many-complex-menu-items',
];

Promise.resolve(
  Object.entries(stories)
    // .filter(([id]) => id.startsWith('button--'))
    .filter(([id]) => !SKIPS.includes(id))
    .map(([id, { kind, story }]) => ({ id, kind, story })),
).then((stories) => {
  stories.forEach(({ id, kind, story }) => {
    const kindName = sanitizeForFileName(kind);
    const storyName = sanitizeForFileName(story);
    describe(kindName, async () => {
      it(storyName, async function () {
        await this.browser.selectStory(id);
        await this.browser.assertView('$static', '#test-element');
      });
    });
  });
});
