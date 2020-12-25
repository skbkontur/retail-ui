import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import * as ReactUI from '../../index';

function isClassComponent(component: any) {
  return typeof component === 'function' && !!component.prototype.isReactComponent;
}

function isFunctionComponent(component: any) {
  return typeof component === 'function' && Object.prototype.hasOwnProperty.call(component, '__KONTUR_REACT_UI__');
}

function isReactComponent(component: any) {
  return isClassComponent(component) || isFunctionComponent(component);
}

const PUBLIC_COMPONENTS = Object.keys(ReactUI).filter(name => {
  return (
    isReactComponent((ReactUI as any)[name]) &&
    !['LocaleProvider', 'LocaleConsumer', 'ThemeProvider', 'ThemeConsumer'].includes(name)
  );
});

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
  Toast: { manual: true, opened: true },
};

const isTestableComponent = (name: string) => !['Tab', 'Toast', 'Hint', 'Tooltip'].includes(name);

describe('Props Forwarding', () => {
  describe('Common Props', () => {
    const getTestDOMNode = (compName: string, wrapper: ReactWrapper) => {
      switch (compName) {
        default:
          return wrapper.getDOMNode();
      }
    };

    it.each<[string, ReactWrapper]>(
      PUBLIC_COMPONENTS.filter(isTestableComponent).map(name => {
        const component = (ReactUI as any)[name];
        const props: any = (DEFAULT_PROPS as any)[name] || {};
        return [name, mount(React.createElement(component, props))];
      }),
    )('%s', (compName, wrapper) => {
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
});
