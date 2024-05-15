import React from 'react';
import { flatten } from 'lodash';

import { Gapped } from '../../Gapped';
import { Autocomplete } from '../Autocomplete';
import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { AutocompleteProps } from '..';
import { delay } from '../../../lib/utils';
import { LangCodes, LocaleContext } from '../../../lib/locale';

export default {
  title: 'Autocomplete',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '0 200px 200px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const commonTests: CreeveyTests = {
  async 'focus and type text'() {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  },
};

const sizeTests: CreeveyTests = {
  async 'focus and type text small'() {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElements = await this.browser.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElements[0]).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  },
  async 'focus and type text medium'() {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElements = await this.browser.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElements[1]).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  },
  async 'focus and type text large'() {
    const screenshotElement = this.browser.findElement({ css: '#test-element' });
    const autocompleteElements = await this.browser.findElements({ css: '[data-comp-name~="Autocomplete"]' });

    await this.browser.actions({ bridge: true }).click(autocompleteElements[2]).sendKeys('o').perform();
    await delay(1000);

    await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
  },
};

export const Simple: Story = () => <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />;
Simple.storyName = 'simple';

Simple.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async focused() {
        const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

        await this.browser.actions({ bridge: true }).click(autocompleteElement).perform();
        await delay(1000);

        await this.expect(await autocompleteElement.takeScreenshot()).to.matchImage();
      },
      ...commonTests,
    },
  },
};

export const WithRenderItem = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithRenderItem.storyName = 'with renderItem';

WithRenderItem.parameters = {
  creevey: {
    tests: commonTests,
  },
};

export const WithBigRenderItemWidth = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>}
  />
);
WithBigRenderItemWidth.storyName = 'with big renderItem width';

WithBigRenderItemWidth.parameters = {
  creevey: {
    tests: commonTests,
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
WithFixedMenuSize.storyName = 'with fixed menu size';

WithFixedMenuSize.parameters = {
  creevey: {
    tests: commonTests,
  },
};

export const WithOnBlurOnFocusHandlers = () => <WithBlurFocusHandlersExample />;
WithOnBlurOnFocusHandlers.storyName = 'with onBlur/onFocus handlers';

WithOnBlurOnFocusHandlers.parameters = {
  creevey: {
    skip: true,
  },
};

interface UncontrolledAutocompleteState {
  value: string;
}
class UncontrolledAutocomplete extends React.Component<Partial<AutocompleteProps>> {
  public state: UncontrolledAutocompleteState = {
    value: '',
  };

  public render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onValueChange={(value) => {
          this.setState({ value });
        }}
      />
    );
  }
}

class WithBlurFocusHandlersExample extends React.Component {
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
WithPercentageWidth.storyName = 'with percentage width';

WithPercentageWidth.parameters = {
  creevey: {
    tests: commonTests,
  },
};

export const WithFixedWidth = () => (
  <UncontrolledAutocomplete
    width="200px"
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithFixedWidth.storyName = 'with fixed width';

WithFixedWidth.parameters = {
  creevey: {
    tests: commonTests,
  },
};

export const WithZeroWidth = () => (
  <UncontrolledAutocomplete
    width={0}
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithZeroWidth.storyName = 'with zero width';

WithZeroWidth.parameters = {
  creevey: {
    tests: commonTests,
  },
};

export const MobileSimple = () => (
  <>
    <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />
    <span>With caption</span>
    <UncontrolledAutocomplete source={['One', 'Two', 'Three']} mobileMenuHeaderText={'With caption'} />
    <span>With many items</span>
    <UncontrolledAutocomplete
      source={flatten(
        new Array(10).fill(['One', 'Two', 'Three']).map((arr, index) => arr.map((i: string) => `${i} ${index}`)),
      )}
    />
  </>
);
MobileSimple.title = 'Mobile autocomplete stories';
MobileSimple.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: { skip: true },
};

const mobileHintsTests: CreeveyTests = {
  async noInputValue() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await delay(200);

    await this.expect(await this.browser.takeScreenshot()).to.matchImage('noInputValue');
  },

  async nothingWasFound() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('abc')
      .perform();
    await delay(200);

    await this.expect(await this.browser.takeScreenshot()).to.matchImage('nothingWasFound');
  },

  async updateValue() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('one')
      .perform();
    await delay(200);

    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await delay(200);

    await this.expect(await this.browser.takeScreenshot()).to.matchImage('updateValue');
  },
};

export const MobileHints: Story = () => <UncontrolledAutocomplete source={['one', 'two', 'three']} />;
MobileHints.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: {
    tests: mobileHintsTests,
  },
};

export const MobileHintsEN: Story = () => (
  <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
    <UncontrolledAutocomplete source={['one', 'two', 'three']} />
  </LocaleContext.Provider>
);
MobileHintsEN.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: {
    tests: mobileHintsTests,
  },
};

export const MobileWithTitle: Story = () => (
  <UncontrolledAutocomplete mobileMenuHeaderText="Заголовок" source={['one', 'two', 'three']} />
);
MobileWithTitle.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: {
    tests: {
      async opened() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .perform();
        await delay(200);

        await this.expect(await this.browser.takeScreenshot()).to.matchImage('opened');
      },
    },
  },
};

export const WithManualPosition: Story = () => {
  const [menuPos, setMenuPos] = React.useState<'top' | 'bottom'>('top');

  return (
    <div style={{ marginTop: '300px', paddingBottom: '300px' }}>
      <UncontrolledAutocomplete menuPos={menuPos} source={['One', 'Two', 'Three']} />
      <button data-tid="pos" onClick={() => setMenuPos(menuPos === 'top' ? 'bottom' : 'top')}>
        change pos to {menuPos === 'top' ? 'bottom' : 'top'}
      </button>
    </div>
  );
};
WithManualPosition.storyName = 'with manual position';
WithManualPosition.parameters = {
  creevey: {
    skip: { 'no themes': { in: /^(?!\b(chrome|firefox)\b)/ } },
    tests: {
      async 'opened top with portal'() {
        const screenshotElement = this.browser.findElement({ css: '#test-element' });
        const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

        await this.browser.actions({ bridge: true }).click(autocompleteElement).sendKeys('o').perform();
        await delay(1000);

        await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
      },
      async 'opened bottom with portal'() {
        const screenshotElement = this.browser.findElement({ css: '#test-element' });
        const autocompleteElement = this.browser.findElement({ css: '[data-comp-name~="Autocomplete"]' });

        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
          .pause(1000)
          .click(autocompleteElement)
          .sendKeys('o')
          .perform();
        await delay(1000);

        await this.expect(await screenshotElement.takeScreenshot()).to.matchImage();
      },
    },
  },
};

export const Size = () => {
  const source = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.',
    'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.',
    'Donec lacus nunc, viverra nec.',
    'Sed lectus. Integer euismod lacus luctus magna.',
    'Suspendisse potenti.',
    ' Sed dignissim lacinia nunc.',
  ];

  return (
    <div>
      <Gapped style={{ height: '300px', width: '1000px' }}>
        <UncontrolledAutocomplete source={source} size={'small'} />
        <UncontrolledAutocomplete source={source} size={'medium'} />
        <UncontrolledAutocomplete source={source} size={'large'} />
      </Gapped>
    </div>
  );
};
Size.storyName = 'size';

Size.parameters = {
  creevey: {
    tests: sizeTests,
  },
};
