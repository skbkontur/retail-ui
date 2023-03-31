const { stories } = require('./stories.json');

Promise.resolve(
  Object.entries(stories)
    .filter(([id]) => id.startsWith('button--'))
    .map(([id, { kind, story }]) => ({ id, kind, story })),
).then((stories) => {
  stories.forEach(({ id, kind, story }) => {
    describe(kind, async () => {
      it(story, async function () {
        await this.browser.selectStory(id);
        await this.browser.assertView('$static', '#test-element');
      });
    });
  });
});
