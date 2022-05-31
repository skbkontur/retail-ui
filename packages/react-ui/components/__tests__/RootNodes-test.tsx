import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import * as ReactUI from '../../index';
import { InstanceWithRootNode } from '../../lib/rootNode';

// all components that are available for import from the react-ui
const PUBLIC_COMPONENTS = Object.keys(ReactUI).filter((name) => {
  return isPublicComponent((ReactUI as any)[name]);
});

// some components have required props
// so we need this in order to create them dynamically
// also we pass values to inputs to check their forwarding
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
  Hint: { text: 'Hint', manual: true, opened: true, children: null },
  Tooltip: { trigger: 'opened', render: () => 'Tooltip', children: null },
  Toast: { children: <i /> },
  Tab: { id: 'tab' },
  GlobalLoader: { active: true },
};

// allows rendering Tab not only inside Tabs
// by mocking throwing module
jest.mock('invariant', () => (...args: any[]) => {
  if (args[1] !== 'Tab should be placed inside Tabs component') {
    jest.requireActual('invariant')(...args);
  }
});

const createWrapper = <T extends React.Component>(compName: string, initProps: object = {}) => {
  const component = (ReactUI as any)[compName];
  const props = { ...(DEFAULT_PROPS as any)[compName], ...initProps };
  return mount<T, {}, {}>(React.createElement(component, props));
};

describe('rootNode', () => {
  describe('is available on instance of', () => {
    const getTestDOMNode = (compName: string, wrapper: ReactWrapper) => {
      switch (compName) {
        case 'Hint':
        case 'Tooltip':
          return wrapper.find('[data-tid~="Popup"]').last().getDOMNode();
        case 'Toast':
          (wrapper as ReactWrapper<{}, {}, ReactUI.Toast>).instance().push('Toast');
          return wrapper.update().find('ToastView').getDOMNode();
        default:
          return wrapper.getDOMNode();
      }
    };

    it.each<[string, ReactWrapper]>(PUBLIC_COMPONENTS.map((name) => [name, createWrapper(name)]))(
      '%s',
      (compName, wrapper) => {
        const instance = wrapper.instance() as unknown as InstanceWithRootNode;
        const wrapperNode = getTestDOMNode(compName, wrapper);

        expect(instance.getRootNode()).toBe(wrapperNode);
      },
    );
  });
});

export function isPublicComponent(component: any) {
  // it's either ClassComponent or FunctionalComponent with Kontur's mark
  return (
    typeof component === 'function' &&
    (component.prototype.isReactComponent || Object.prototype.hasOwnProperty.call(component, '__KONTUR_REACT_UI__'))
  );
}
