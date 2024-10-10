import React from 'react';
import { flatten } from 'lodash';

import { Gapped } from '../../Gapped';
import { Autocomplete } from '../Autocomplete';
import { Meta, Story } from '../../../typings/stories';
import { AutocompleteProps } from '..';
import { LangCodes, LocaleContext } from '../../../lib/locale';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
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

export const Simple: Story = () => <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />;
Simple.storyName = 'simple';

export const WithDisabledPortal: Story = () => {
  const source = ['One', 'Two', 'Three'];

  return (
    <div>
      <Gapped style={{ height: '300px', width: '1000px', margin: '200px' }}>
        <UncontrolledAutocomplete disablePortal source={source} menuPos={'top'} />
        <UncontrolledAutocomplete disablePortal source={source} menuPos={'bottom'} />
      </Gapped>
    </div>
  );
};
WithDisabledPortal.storyName = 'with disabled portal';

export const WithRenderItem = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithRenderItem.storyName = 'with renderItem';

export const WithBigRenderItemWidth = () => (
  <UncontrolledAutocomplete
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>}
  />
);
WithBigRenderItemWidth.storyName = 'with big renderItem width';

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

export const WithFixedWidth = () => (
  <UncontrolledAutocomplete
    width="200px"
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithFixedWidth.storyName = 'with fixed width';

export const WithZeroWidth = () => (
  <UncontrolledAutocomplete
    width={0}
    source={['One', 'Two', 'Three']}
    renderItem={(x: string) => <div>Item: {x.toUpperCase()}</div>}
  />
);
WithZeroWidth.storyName = 'with zero width';

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

export const MobileHints: Story = () => <UncontrolledAutocomplete source={['one', 'two', 'three']} />;
MobileHints.parameters = {
  viewport: {
    defaultViewport: 'iphone',
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
};

export const MobileWithTitle: Story = () => (
  <UncontrolledAutocomplete mobileMenuHeaderText="Заголовок" source={['one', 'two', 'three']} />
);
MobileWithTitle.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

export const WithManualPosition: Story = () => {
  const [menuPos, setMenuPos] = React.useState<'top' | 'bottom'>('top');

  return (
    <div style={{ marginTop: '300px', paddingBottom: '300px' }}>
      {' '}
      <UncontrolledAutocomplete menuPos={menuPos} source={['One', 'Two', 'Three']} />
      <button data-tid="pos" onClick={() => setMenuPos(menuPos === 'top' ? 'bottom' : 'top')}>
        change pos to {menuPos === 'top' ? 'bottom' : 'top'}
      </button>
    </div>
  );
};
WithManualPosition.storyName = 'with manual position';

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

export const MenuPos = () => {
  const source = ['One', 'Two', 'Three'];

  return (
    <div>
      <Gapped style={{ height: '300px', width: '1000px', margin: '200px' }}>
        <UncontrolledAutocomplete source={source} menuPos={'top'} />
        <UncontrolledAutocomplete source={source} menuPos={'bottom'} />
      </Gapped>
    </div>
  );
};
MenuPos.storyName = 'menuPos';
