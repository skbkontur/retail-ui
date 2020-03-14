import { Checkbox } from './Checkbox';
import React, { Component } from 'react';
import { CSFStory } from 'creevey';

export default {
  title: '😌 TestRetreatCheckboxError',
};

class CheckboxWithErrorClass extends Component<any, any> {
  public state = {
    checked: false,
    error: true,
  };

  public render() {
    const { checked, error } = this.state;
    return (
      <Checkbox error={error}
                onValueChange={() => this.setState({ checked: !checked })}
                checked={checked}>
        {this.props.children}
      </Checkbox>
    );
  }
}

export const CheckboxWithError: CSFStory<JSX.Element> = () => <CheckboxWithErrorClass>CheckboxWithError</CheckboxWithErrorClass>;
CheckboxWithError.story = {
  name: 'checkboxWithError',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hovered' }],
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async hovered() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: 'span' }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
        },
        async clicked() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'span' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
        async tabPress() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'span' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .move({ origin: this.browser.findElement({ css: 'body' }) })
            .press()
            .release()
            .sendKeys(this.keys.TAB)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
        },
        async spacePressAfterClick() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#test-element' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
        },
        async doubleSpacePressAfterClick() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#test-element' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('doubleSpacePress');
        },
      },
    },
  },
};
