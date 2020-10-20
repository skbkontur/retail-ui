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

export const Simple: CSFStory<JSX.Element> = () => <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />;
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
        ...commonTests,
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
