import { expect } from 'chai';
import { By } from 'selenium-webdriver';

const storyNames = [
  'All pin opened',
  'All pin opened without portal',
  'All pin opened on small elements',
  'All pin opened on small elements without portal',
  'Hint',
  'Toast',
  'Small width',
  'Container with overflow hidden',
];

describe('Popup', function() {
  storyNames.forEach(test);
});

function test(storyName: string) {
  describe(storyName, function() {
    it('plain', async function() {
      const element = await this.browser.findElement(By.css('#test-element'));
      await expect(await element.takeScreenshot()).to.matchImage('plain');
    });
  });
}
