describe('Button', () => {
  it('Align', async function () {
    await this.browser.selectStory('button--align');
    await this.browser.assertView('plain', '#test-element');
  });
});
