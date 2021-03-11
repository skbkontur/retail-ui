import React, { useState } from 'react';
import { StoryFn } from '@storybook/addons';
import AddIcon from '@skbkontur/react-icons/Add';
import { action } from '@storybook/addon-actions';
import { CSFStory, CreeveyStoryParams } from 'creevey';

import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import { Button } from '../../Button';
import { Select } from '../Select';

class SelectWrapper extends React.Component<{}, any> {
  public state = {
    value: { label: 'One', value: 1 },
  };

  public render() {
    return (
      <div>
        <Select<{ label: string; value: number }>
          items={[
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
          ]}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          renderItem={x => x.label}
          renderValue={x => {
            if (x) {
              return x.label;
            }
          }}
        />
      </div>
    );
  }
}

class ItemsWithComments extends React.Component<{}, any> {
  private static items: Array<[number, string, React.ReactNode?]> = [
    [1, 'ООО Эльбрус', '8387666415 - 113445852'],
    [2, 'ИП Иванов Петр', '583662338391'],
    [3, 'ЗАО Текстильщики'],
  ];

  public state = {
    value: ItemsWithComments.items[0][0],
  };

  public render() {
    return (
      <div>
        <Select<number, string>
          width={200}
          value={this.state.value}
          items={ItemsWithComments.items}
          onValueChange={value => this.setState({ value })}
        />
      </div>
    );
  }
}

class SelectWithNull extends React.Component<any, any> {
  public state = {
    value: null,
  };

  public render() {
    return (
      <div>
        <div>
          value: <b>{JSON.stringify(this.state.value)}</b>
        </div>
        <Select<number | null>
          items={[[null, 'Any'], Select.SEP, [1, 'First'], [2, 'Second'], [3, 'Third']]}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
        />
      </div>
    );
  }
}

export default {
  title: 'Select',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div className="dropdown-test-container" style={{ height: 150, width: 200, padding: 4 }}>
        {story()}
      </div>
    ),
  ],
};

const selectTests: CreeveyStoryParams['tests'] = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async clicked() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  },
  async ['MenuItem hover']() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('MenuItem hover');
  },
  async ['selected item']() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('selected item');
  },
};

export const Simple: CSFStory<JSX.Element> = () => <Select items={['one', 'two', 'three']} />;
Simple.story = {
  parameters: {
    creevey: {
      captureElement: '.dropdown-test-container',
      skip: [{ in: 'ie11', tests: 'MenuItem hover' }],
      tests: selectTests,
    },
  },
};

export const ComplexValues = () => <SelectWrapper />;
ComplexValues.story = { name: 'Complex values', parameters: { creevey: { skip: [true] } } };

export const ItemsWithCommentsStory = () => <ItemsWithComments />;
ItemsWithCommentsStory.story = { name: 'Items with comments', parameters: { creevey: { skip: [true] } } };

export const WithNull = () => <SelectWithNull />;
WithNull.story = { name: 'With null', parameters: { creevey: { skip: [true] } } };

export const UseLink: CSFStory<JSX.Element> = () => <Select use="link" items={['one', 'two', 'three']} />;
UseLink.story = {
  name: 'use link',
  parameters: {
    creevey: {
      captureElement: '.dropdown-test-container',
      skip: [{ in: 'ie11', tests: 'MenuItem hover' }],
      tests: selectTests,
    },
  },
};

export const UseLinkWithIcon: CSFStory<JSX.Element> = () => (
  <Select _icon={<AddIcon />} use="link" items={['one', 'two', 'three']} />
);
UseLinkWithIcon.story = {
  name: 'use link with icon',
  parameters: {
    creevey: {
      captureElement: '.dropdown-test-container',
      skip: [{ in: 'ie11', tests: 'MenuItem hover' }],
      tests: selectTests,
    },
  },
};

export const WithTextOverflow: CSFStory<JSX.Element> = () => (
  <Select width="100px" items={['oneoneone', 'twotwotwo', 'twotwotwo']} />
);
WithTextOverflow.story = {
  name: 'with text overflow',
  parameters: {
    creevey: {
      captureElement: '.dropdown-test-container',
      skip: [{ in: 'ie11', tests: 'MenuItem hover' }],
      tests: selectTests,
    },
  },
};

export const ExternalFocus = () => {
  class Sample extends React.Component {
    private selectElem: Select | null = null;
    public render() {
      return (
        <div>
          <Select
            width="100px"
            items={['oneoneone', 'twotwotwo', 'twotwotwo']}
            ref={this.refSelect}
            onFocus={action('handleFocus')}
            onBlur={action('handleBlur')}
          />
          <br />
          <button onClick={this.handleClick}>Focus!</button>
        </div>
      );
    }

    private refSelect = (element: Select<any, any> | null) => {
      this.selectElem = element;
    };

    private handleClick = () => {
      if (this.selectElem) {
        this.selectElem.focus();
      }
    };
  }

  return <Sample />;
};
ExternalFocus.story = { name: 'external focus', parameters: { creevey: { skip: [true] } } };

export const UsingOnKeyDown: CSFStory<JSX.Element> = () => {
  class Sample extends React.Component {
    public state = {
      opened: false,
      text: 'wait...',
    };
    private button: Button | null = null;
    public render() {
      return (
        <div>
          <Select
            items={['one', 'two', 'three']}
            onKeyDown={this.onKeyDown}
            onOpen={this.onOpen}
            onClose={this.onClose}
          />
          <br />
          <Button
            onFocus={this.onFocus}
            ref={el => {
              this.button = el;
            }}
          >
            {this.state.text}
          </Button>
        </div>
      );
    }

    private onOpen = () => this.setState({ opened: true });
    private onClose = () => this.setState({ opened: false });
    private onFocus = () => this.setState({ text: 'focused!' });
    private onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (this.button && isKeyEnter(e) && this.state.opened) {
        this.button.focus();
      }
    };
  }

  return <Sample />;
};
UsingOnKeyDown.story = {
  name: 'using onKeyDown',
  parameters: {
    creevey: {
      tests: {
        async ['press Enter']() {
          const element = await this.browser.findElement({ css: '.dropdown-test-container' });
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .sendKeys(this.keys.ENTER)
            .sendKeys(this.keys.ARROW_DOWN)
            .sendKeys(this.keys.ENTER)
            .perform();
          await this.expect(await element.takeScreenshot()).to.matchImage('press Enter');
        },
      },
    },
  },
};

export const WithSearchAndVariousWidth: CSFStory<JSX.Element> = () => {
  let selectElem: Select | null = null;
  const [width, setWidth] = useState();
  const changeWidth = (w: string) => {
    setWidth(w);
    if (selectElem) {
      selectElem.open();
    }
  };

  return (
    <div data-tid="root" style={{ width: 500, height: 250 }}>
      <Button data-tid="w100px" onClick={() => changeWidth('100px')}>
        100px
      </Button>
      <Button data-tid="w300px" onClick={() => changeWidth('300px')}>
        300px
      </Button>
      <Button data-tid="w100prc" onClick={() => changeWidth('100%')}>
        100%
      </Button>
      <br />
      <Select ref={ref => (selectElem = ref)} search width={width} items={['one', 'two', 'three']} />
    </div>
  );
};
WithSearchAndVariousWidth.story = {
  name: 'with search',
  parameters: {
    creevey: {
      captureElement: '#test-element',
      tests: {
        async ['search']() {
          const root = await this.browser.findElement({ css: '[data-tid="root"]' });
          const select = await this.browser.findElement({ css: '[data-comp-name~="Select"]' });

          await this.browser
            .actions({
              bridge: true,
            })
            .click(select)
            .perform();

          const plainSearch = await root.takeScreenshot();

          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="Input"]' }))
            .sendKeys('test')
            .perform();

          const fullFieldSearch = await root.takeScreenshot();

          await this.browser
            .actions({
              bridge: true,
            })
            .click(select)
            .click(select)
            .perform();

          const emptySearch = await root.takeScreenshot();

          await this.expect({ plainSearch, fullFieldSearch, emptySearch }).to.matchImages();
        },

        async ['and various width']() {
          const root = await this.browser.findElement({ css: '[data-tid="root"]' });

          await this.browser
            .actions({ bridge: true })
            .click(await this.browser.findElement({ css: '[data-tid="w100px"]' }))
            .perform();

          const w100px = await root.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(await this.browser.findElement({ css: '[data-tid="w300px"]' }))
            .perform();

          const w300px = await root.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(await this.browser.findElement({ css: '[data-tid="w100prc"]' }))
            .perform();

          const w100prc = await root.takeScreenshot();

          await this.expect({ w100px, w300px, w100prc }).to.matchImages();
        },
      },
    },
  },
};
