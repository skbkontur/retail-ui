// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { PlusIcon16Regular } from '@skbkontur/icons/icons/PlusIcon/PlusIcon16Regular';
import { action } from '@storybook/addon-actions';
import type { CSFStory } from 'creevey';

import type { Meta, Story } from '../../../typings/stories';
import { isKeyEnter } from '../../../lib/events/keyboard/identifiers';
import { Button } from '../../Button';
import type { SelectProps } from '../Select';
import { Select } from '../Select';
import { Gapped } from '../../Gapped';
import { ResponsiveLayout } from '../../ResponsiveLayout';
import { MenuItem } from '../../MenuItem';

const mobileDecorator = (Story: () => JSX.Element) => {
  return (
    <div
      style={{
        width: '475px',
        height: '100vh',
      }}
    >
      <Story />
    </div>
  );
};
interface SelectWrapperValue {
  label: string;
  value: number;
}
interface SelectWrapperState {
  value: SelectWrapperValue;
}
class SelectWrapper extends React.Component {
  public state: SelectWrapperState = {
    value: { label: 'One', value: 1 },
  };

  public render() {
    return (
      <div>
        <Select<SelectWrapperValue>
          items={[
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
          ]}
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
          renderItem={(x) => x.label}
          renderValue={(x) => {
            if (x) {
              return x.label;
            }
          }}
        />
      </div>
    );
  }
}

interface ItemsWithCommentsState {
  value: number;
}
type ItemWithComments = [number, string, React.ReactNode?];
class ItemsWithComments extends React.Component {
  private static items: ItemWithComments[] = [
    [1, 'ООО Эльбрус', '8387666415 - 113445852'],
    [2, 'ИП Иванов Петр', '583662338391'],
    [3, 'ЗАО Текстильщики'],
  ];

  public state: ItemsWithCommentsState = {
    value: ItemsWithComments.items[0][0],
  };

  public render() {
    return (
      <div>
        <Select<number, string>
          width={200}
          value={this.state.value}
          items={ItemsWithComments.items}
          onValueChange={(value) => this.setState({ value })}
        />
      </div>
    );
  }
}

type SelectWithNullStateValue = number | null;
interface SelectWithNullState {
  value: SelectWithNullStateValue;
}
class SelectWithNull extends React.Component {
  public state: SelectWithNullState = {
    value: null,
  };

  public render() {
    return (
      <div>
        <div>
          value: <b>{JSON.stringify(this.state.value)}</b>
        </div>
        <Select<SelectWithNullStateValue>
          items={[[null, 'Any'], Select.SEP, [1, 'First'], [2, 'Second'], [3, 'Third']]}
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
        />
      </div>
    );
  }
}

export const Simple: Story = () => (
  <div style={{ height: '150px' }}>
    <Select items={['one', 'two', 'three']} />
  </div>
);

export const MobileSimple = () => {
  const items = [
    'one',
    'two',
    'three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three three',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '16',
    'seventeen',
    '18',
    '19',
    'откуда мы можем знать что это двадцать?',
  ];

  const [show, setShow] = useState<{ showFirst: boolean; showSecond: boolean; showThird: boolean }>({
    showFirst: true,
    showSecond: true,
    showThird: true,
  });

  return (
    <Gapped vertical>
      <span onClick={() => setShow({ ...show, showFirst: !show.showFirst })}>With small count of items</span>
      {show.showFirst && (
        <Select
          items={items.slice(-5)}
          mobileMenuHeaderText={'This is header This is header This is header This is header This is header'}
        />
      )}
      <span onClick={() => setShow({ ...show, showSecond: !show.showSecond })}>With big count of items</span>
      {show.showSecond && <Select items={items} mobileMenuHeaderText={'This is header'} />}
      <span onClick={() => setShow({ ...show, showThird: !show.showThird })}>With search</span>
      {show.showThird && <Select items={items} mobileMenuHeaderText={'This is header'} search />}
      <ResponsiveLayout onLayoutChange={(layout) => console.log(layout)} />
    </Gapped>
  );
};
MobileSimple.title = 'Mobile stories';
MobileSimple.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: { skip: true },
};
MobileSimple.decorators = [
  (Story: () => JSX.Element) => (
    <div
      style={{
        width: 'calc(100vw - 16px)',
        height: 'calc(100vh - 16px)',
        margin: -8,
        padding: 8,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: 'calc(100vw - 16px)',
          height: 'calc(125vh - 16px)',
          backgroundColor: 'lightBlue',
          margin: -8,
          padding: 8,
        }}
      >
        <Story />
      </div>
    </div>
  ),
];

export const MobileWithLongItem: Story = () => {
  const longItem = 'Two '.repeat(50);

  return (
    <div style={{ width: '200px' }}>
      <Select items={['One', `${longItem}`, 'Three']} value={longItem}></Select>
    </div>
  );
};

MobileWithLongItem.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

export const MobileWithSearch: Story = () => (
  <Select search items={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']} />
);
MobileWithSearch.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileWithSearch.decorators = [mobileDecorator as () => JSX.Element];

export const MobileWithTitle: Story = () => (
  <Select
    mobileMenuHeaderText="Заголовок"
    items={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']}
  />
);
MobileWithTitle.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileWithTitle.decorators = [mobileDecorator as () => JSX.Element];

export const MobileWithTitleAndSearch: Story = () => (
  <Select
    search
    mobileMenuHeaderText="Заголовок"
    items={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']}
  />
);
MobileWithTitleAndSearch.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileWithTitleAndSearch.decorators = [mobileDecorator as () => JSX.Element];

export const MobileWithoutTitleAndSearch: Story = () => (
  <Select items={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']} />
);
MobileWithoutTitleAndSearch.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileWithoutTitleAndSearch.decorators = [mobileDecorator as () => JSX.Element];

export const Disabled: CSFStory<JSX.Element> = () => (
  <>
    <Select disabled items={['value']} value="value" />
    <Select disabled placeholder="placeholder" />
  </>
);

Disabled.storyName = 'disabled';

export const ComplexValues = () => <SelectWrapper />;
ComplexValues.storyName = 'Complex values';
ComplexValues.parameters = { creevey: { skip: true } };

export const ItemsWithCommentsStory = () => <ItemsWithComments />;
ItemsWithCommentsStory.storyName = 'Items with comments';
ItemsWithCommentsStory.parameters = { creevey: { skip: true } };

export const WithNull = () => <SelectWithNull />;
WithNull.storyName = 'With null';
WithNull.parameters = { creevey: { skip: true } };

export const UseLink: Story = () => <Select use="link" items={['one', 'two', 'three']} />;
UseLink.storyName = 'use link';

export const UseLinkWithIcon: Story = () => (
  <Select _icon={<PlusIcon16Regular />} use="link" items={['one', 'two', 'three']} />
);
UseLinkWithIcon.storyName = 'use link with icon';

export const WithTextOverflow: Story = () => <Select width="100px" items={['oneoneone', 'twotwotwo', 'twotwotwo']} />;
WithTextOverflow.storyName = 'with text overflow';

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

    private refSelect: React.RefObject<Select> = React.createRef<Select>();

    private handleClick = () => {
      if (this.selectElem) {
        this.selectElem.focus();
      }
    };
  }

  return <Sample />;
};
ExternalFocus.storyName = 'external focus';
ExternalFocus.parameters = { creevey: { skip: true } };

export const UsingOnKeyDown: Story = () => {
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
            ref={(el) => {
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
UsingOnKeyDown.storyName = 'using onKeyDown';

export const WithSearchAndVariousWidth: Story = () => {
  let selectElem: Select<string, string> | null = null;
  const [width, setWidth] = useState<string>();
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
      <Select ref={(ref) => (selectElem = ref)} search width={width} items={['one', 'two', 'three']} />
    </div>
  );
};
WithSearchAndVariousWidth.storyName = 'with search';

export const WithMenuAlignAndVariousWidth: Story = () => {
  const widths: Array<SelectProps<any, any>['width']> = [
    undefined,
    '80px',
    '120px',
    '80%',
    '120%',
    'calc(100% + 40px)',
  ];
  const row: Array<Partial<SelectProps<any, any>>> = [
    { menuAlign: 'right' },
    { menuAlign: 'right', disablePortal: true },
    { menuAlign: 'left' },
    { menuAlign: 'left', disablePortal: true },
  ];
  const renderSelect = (width: SelectProps<any, any>['width'], props: Partial<SelectProps<any, any>>) => (
    <Select ref={(el) => el?.open()} width={100} menuWidth={width} items={[width || 'default']} value="" {...props} />
  );

  return (
    <div style={{ padding: '0 50px' }}>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', width: 550 }}>
        {row.map((props, i) => (
          <span key={i}>portal: {String(!props.disablePortal)}</span>
        ))}
      </div>
      {widths.map((width) => (
        <div
          key={String(width)}
          style={{ marginBottom: 50, display: 'flex', justifyContent: 'space-between', width: 550 }}
        >
          {row.map((props) => renderSelect(width, props))}
        </div>
      ))}
    </div>
  );
};
WithMenuAlignAndVariousWidth.parameters = {
  creevey: { skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } } },
};

export default {
  title: 'Select',
  component: Select,
  decorators: [
    (Story: () => JSX.Element, context) => {
      if (
        !/mobile/i.test(context.name) &&
        ![WithMenuAlignAndVariousWidth, WithManualPosition].includes(context.originalStoryFn as Story)
      ) {
        return (
          <div className="dropdown-test-container" style={{ minHeight: 150, minWidth: 200, padding: 4 }}>
            <Story />
          </div>
        );
      }

      return <Story />;
    },
  ],
} as Meta;

export const WithManualPosition: Story = () => {
  const [menuPos, setMenuPos] = React.useState<'top' | 'bottom'>('top');
  const [isPortalDisabled, setIsPortalDisabled] = React.useState(false);

  return (
    <div style={{ marginTop: '300px', paddingBottom: '300px' }}>
      <Select disablePortal={isPortalDisabled} menuPos={menuPos} items={['one', 'two', 'three']} />
      <button data-tid="pos" onClick={() => setMenuPos(menuPos === 'top' ? 'bottom' : 'top')}>
        change pos to {menuPos === 'top' ? 'bottom' : 'top'}
      </button>
      <button data-tid="portal" onClick={() => setIsPortalDisabled(!isPortalDisabled)}>
        {isPortalDisabled ? 'enable' : 'disable'} portal
      </button>
    </div>
  );
};
WithManualPosition.storyName = 'with manual position';

export const Size: Story = () => {
  const items = ['one', <MenuItem key={2}>two</MenuItem>, 'three'];
  let small: Select<string | JSX.Element, string | JSX.Element> | null = null;
  let medium: Select<string | JSX.Element, string | JSX.Element> | null = null;
  let large: Select<string | JSX.Element, string | JSX.Element> | null = null;
  const handleClick = () => {
    if (small) {
      small.open();
    }
    if (medium) {
      medium.open();
    }
    if (large) {
      large.open();
    }
  };
  return (
    <div>
      <Button onClick={handleClick} data-tid="open-all">
        Open All
      </Button>
      <Gapped style={{ height: '250px' }}>
        <Select
          size={'small'}
          items={items}
          ref={(element) => {
            small = element;
          }}
        />
        <Select
          size={'medium'}
          items={items}
          ref={(element) => {
            medium = element;
          }}
        />
        <Select
          size={'large'}
          items={items}
          ref={(element) => {
            large = element;
          }}
        />
      </Gapped>
    </div>
  );
};
