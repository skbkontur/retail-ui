import React from 'react';
import { CSFStory, CreeveyStoryParams } from 'creevey';
import { StoryFn } from '@storybook/addons';

import { Gapped } from '../../Gapped';
import { Autocomplete } from '../Autocomplete';

export default {
  title: 'Autocomplete',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div
        style={{
          padding: '0 200px 200px 0',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

const commonTests: CreeveyStoryParams['tests'] = {
  async ['focus and type text']() {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser
      .actions({ bridge: true })
      .click(autocompleteElement)
      .sendKeys('o')
      .perform();

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  },
};

const extendedTests = (name:string, str: string) => ({
  async [name]() {
    const element = await this.browser.findElement({ css: '#test-element' });
    const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

    await this.browser
      .actions({ bridge: true })
      .click(input)
      .perform();

    await this.browser
      .actions({ bridge: true })
      .sendKeys(str)
      .perform();

    const typed = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .sendKeys(this.keys.ARROW_DOWN)
      .perform();

    const highlighted = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .sendKeys(this.keys.ENTER)
      .perform();

    const selected = await element.takeScreenshot();

    await this.expect({ typed, highlighted, selected }).to.matchImages();
  },
});

export const Simple: CSFStory<JSX.Element> = () => <UncontrolledAutocomplete source={['One', 'Two', 'first value', 'next first']} />;
Simple.story = {
  name: 'simple',
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async focused() {
          const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocompleteElement)
            .perform();

          await this.expect(await autocompleteElement.takeScreenshot()).to.matchImage();
        },
        //Пропадание выпадашки после ввода неподходящего значения
        async wrongTyped() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

            const typed = await element.takeScreenshot();

            await this.browser
              .actions({ bridge: true })
              .sendKeys('x')
              .perform();

            const typedWrong = await element.takeScreenshot();

            await this.expect({ typed, typedWrong }).to.matchImages();
        },
        //Сохранение введенного текста после потери фокуса
        async saveTextOnBlur() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.TAB)
            .perform();

          const noFocus = await element.takeScreenshot();

          await this.expect({ typed, noFocus }).to.matchImages();
        },
        //Нажатие Enter при невыбранном элементе
        async enterWhenNoSelectedItem() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const empty = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ empty, selected }).to.matchImages();
        },
        //Поиск и выбор значения по двум словам
        ...extendedTests('several words', 'first value'),
        //Поиск и выбор значения по подстроке
        ...extendedTests('not first symbol', 'rst'),
        //Регистронезависимость и удаление лишних пробелов
        ...extendedTests('with upper case and spaces', '    ONE'),
      },
    },
  },
};

export const WithRenderItem = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithRenderItem.story = {
  name: 'with renderItem',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};

export const WithBigRenderItemWidth = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>}
  />
);
WithBigRenderItemWidth.story = {
  name: 'with big renderItem width',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};

export const WithFixedMenuSize = () => (
  <UncontrolledAutocomplete
    source={[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.',
      'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.',
      'Donec lacus nunc, viverra nec.',
      'Sed lectus. Integer euismod lacus luctus magna.',
      'Suspendisse potenti.',
      ' Sed dignissim lacinia nunc.',
    ]}
    renderItem={(x: string) => <div>{x}</div>}
    menuWidth={400}
    menuMaxHeight={150}
  />
);
WithFixedMenuSize.story = {
  name: 'with fixed menu size',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};
//Появление скролла при большом кол-ве элементов + его расширение при наведении
export const AutocompleteWithScroll: CSFStory<JSX.Element> = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(`Abba ${i}`);
  }
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <UncontrolledAutocomplete source={items} />
    </div>
  );
};
AutocompleteWithScroll.story = {
  name: 'with scroll',
  parameters: {
    creevey: {
      tests: {
        async scrollBarShouldBeVisible() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const autocomplete = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(autocomplete)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('Abba')
            .perform();

          const typed = await element.takeScreenshot();

          const scrollBar = await this.browser.findElement({ className: 'react-ui-ejkfzu' });

          await this.browser
            .actions({ bridge: true })
            .move({ origin: scrollBar })
            .perform(); //Hover не работает на IE11
          const scrollBarOnHover = await element.takeScreenshot();

          await this.expect({typed, scrollBarOnHover }).to.matchImages();
        },
      },
    },
  },
};
export const WithOnBlurOnFocusHandlers = () => <WithBlurFocusHandlersExample />;
WithOnBlurOnFocusHandlers.story = {
  name: 'with onBlur/onFocus handlers',
  parameters: {
    creevey: {
      skip: [true],
    },
  },
};

class UncontrolledAutocomplete extends React.Component<any, any> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onValueChange={value => {
          this.setState({ value });
        }}
      />
    );
  }
}

class WithBlurFocusHandlersExample extends React.Component<any, any> {
  public state = {
    focusCount: 0,
    blurCount: 0,
  };
  public render() {
    return (
      <Gapped vertical>
        <UncontrolledAutocomplete
          onFocus={() => {
            const { focusCount } = this.state;
            this.setState({ focusCount: focusCount + 1 });
          }}
          onBlur={() => {
            const { blurCount } = this.state;
            this.setState({ blurCount: blurCount + 1 });
          }}
          source={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(
            ' ',
          )}
        />
        <span>Focuses count: {this.state.focusCount}</span>
        <span>Blures count: {this.state.blurCount}</span>
      </Gapped>
    );
  }
}

export const WithPercentageWidth = () => (
  <div style={{ width: '600px' }}>
    <UncontrolledAutocomplete
      width="50%"
      source={['One', 'Two', 'Three']}
      renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
    />
  </div>
);
WithPercentageWidth.story = {
  name: 'with percentage width',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};

export const WithFixedWidth = () => (
  <UncontrolledAutocomplete
    width="200px"
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithFixedWidth.story = {
  name: 'with fixed width',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};

export const WithZeroWidth = () => (
  <UncontrolledAutocomplete
    width={0}
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithZeroWidth.story = {
  name: 'with zero width',
  parameters: {
    creevey: {
      tests: commonTests,
    },
  },
};
// Выравнивание по правому краю
export const WithRightTextAlignment: CSFStory<JSX.Element> = () => (
  <UncontrolledAutocomplete
    align={'right'}
    source={['text', 'two', 'three']}
  />
);
WithRightTextAlignment.story = {
  parameters: {
    creevey: {
      tests: extendedTests('with right alignment', 'text'),
    },
  },
};
//Выравнивание по центру
export const WithCenterTextAlignment: CSFStory<JSX.Element> = () => (
  <UncontrolledAutocomplete
  align={'center'}
  source={['text', 'two', 'three']}
/>
);
WithCenterTextAlignment.story = {
  parameters: {
    creevey: {
      tests: extendedTests('with center alignment', 'text'),
    },
  },
};
