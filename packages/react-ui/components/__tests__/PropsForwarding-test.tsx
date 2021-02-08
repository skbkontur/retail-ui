import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import * as ReactUI from '../../index';

const PUBLIC_COMPONENTS = Object.keys(ReactUI).filter(name => {
  return (
    isPublicComponent((ReactUI as any)[name]) &&
    !['LocaleProvider', 'LocaleConsumer', 'ThemeProvider', 'ThemeConsumer'].includes(name)
  );
});

// some components have required props
// so we need this in order to create them dynamically
const DEFAULT_PROPS = {
  Autocomplete: { value: '', onValueChange: jest.fn() },
  FxInput: { onValueChange: jest.fn() },
  CurrencyInput: { onValueChange: jest.fn() },
  CurrencyLabel: { value: '' },
  DatePicker: { onValueChange: jest.fn() },
  ComboBox: { getItems: () => Promise.resolve([]) },
  TokenInput: { type: ReactUI.TokenInputType.Combined, getItems: () => Promise.resolve([]), onValueChange: jest.fn() },
  Radio: { value: '' },
  RadioGroup: { items: [] },
  Dropdown: { caption: 'caption' },
  DropdownMenu: { caption: 'caption' },
  Fias: { baseUrl: '/' },
  FiasSearch: { api: new ReactUI.FiasAPI('/') },
  Gapped: { children: '' },
  MenuHeader: { children: '' },
  Paging: { activePage: 0, onPageChange: jest.fn(), pagesCount: 0 },
  Sticky: { side: 'top' },
  Switcher: { items: [] },
  Tabs: { value: '' },
  TooltipMenu: { caption: 'caption' },
  TopBarDropdown: { label: 'label' },
  TopBarUser: { userName: 'name' },
  TopBarOrganizations: { caption: 'caption' },
  Hint: { text: 'Hint', manual: true, opened: true, children: <i /> },
  Tooltip: { trigger: 'opened', render: () => 'Tooltip', children: <i /> },
  Toast: { children: <i /> },
  Tab: { id: 'tab' },
  // prevents Input from switching into controlled mode while setting test props
  Input: { value: 'value' },
};

// allows rendering Tab not only inside Tabs
// by mocking throwing module
jest.mock('invariant', () => (...args: any[]) => {
  if (args[1] !== 'Tab should be placed inside Tabs component') {
    jest.requireActual('invariant')(...args);
  }
});

const createWrapper = <T extends {}>(compName: string) => {
  const component = (ReactUI as any)[compName];
  const props: any = (DEFAULT_PROPS as any)[compName] || {};
  return mount<T>(React.createElement(component, props));
};

describe('Props Forwarding', () => {
  describe('Common Props', () => {
    const getTestDOMNode = (compName: string, wrapper: ReactWrapper) => {
      switch (compName) {
        case 'Hint':
        case 'Tooltip':
          return wrapper
            .find('Portal')
            .last()
            .getDOMNode();
        case 'Toast':
          (wrapper as ReactWrapper<{}, {}, ReactUI.Toast>).instance().push('Tast');
          wrapper.update();
          return wrapper.find('ToastView').getDOMNode();
        default:
          return wrapper.getDOMNode();
      }
    };

    it.each<[string, ReactWrapper]>(PUBLIC_COMPONENTS.map(name => [name, createWrapper(name)]))(
      '%s',
      (compName, wrapper) => {
      const props = {
        'data-tid': 'my-data-tid',
        'data-testid': 'my-data-testid',
        className: 'my-classname',
        style: {
          width: '95.5%',
          color: 'red',
        },
      };
      wrapper.setProps(props);

      const wrapperNode = getTestDOMNode(compName, wrapper);

      expect(wrapperNode.getAttribute('data-tid')).toBe(props['data-tid']);
      expect(wrapperNode.getAttribute('data-testid')).toBe(props['data-testid']);
      expect(wrapperNode.classList.contains(props.className)).toBe(true);
      expect(getComputedStyle(wrapperNode)).toMatchObject(props.style);
    });
  });

  describe('"width" Prop', () => {
    const getTestDOMNode = (compName: string, wrapper: ReactWrapper) => {
      switch (compName) {
        case 'Modal':
          return wrapper.find('[data-tid~="modal-content"] > div').getDOMNode();
        case 'SidePage':
          return wrapper.find('div[data-tid~="SidePage__root"]').getDOMNode();
        case 'TokenInput':
          return wrapper.find('label').getDOMNode();
        default:
          return wrapper.getDOMNode();
      }
    };

    it.each<keyof typeof ReactUI>([
      'Button',
      'ComboBox',
      'DateInput',
      'DatePicker',
      'Dropdown',
      'FxInput',
      'Group',
      'Input',
      'RadioGroup',
      'Select',
      'Textarea',
      'Modal',
      'SidePage',
      'Tabs',
      'TokenInput',
    ])('%s', compName => {
      const width = '99px';
      const component = (ReactUI as any)[compName];
      const props = { ...(DEFAULT_PROPS as any)[compName], width };
      const wrapper = mount(React.createElement(component, props));
      const testDOMNode = getTestDOMNode(compName, wrapper);

      expect(getComputedStyle(testDOMNode).width).toBe(width);
    });
  });
});

export function isPublicComponent(component: any) {
  // it's either ClassComponent or FunctionalComponent with Kontur's mark
  return (
    typeof component === 'function' &&
    (component.prototype.isReactComponent || Object.prototype.hasOwnProperty.call(component, '__KONTUR_REACT_UI__'))
  );
}
