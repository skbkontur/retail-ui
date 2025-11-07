import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';

import * as ReactUI from '../../index';
import type { AnyObject } from '../../lib/utils';
import { delay } from '../../lib/utils';
import type { Toast } from '../../index';
import { ModalDataTids, SidePageDataTids, SingleToast, TokenInputDataTids } from '../../index';
import { InputLikeTextDataTids } from '../../internal/InputLikeText';
import { getRootNode } from '../../lib/rootNode';

function isPublicComponent(component: any, name: string) {
  //skip contexts
  switch (name) {
    case 'ResponsiveLayout':
    case 'ReactUIFeatureFlagsContext':
    case 'LocaleContext':
    case 'ThemeContext':
    case 'SizeControlContext':
      return false;
    default:
      return Object.prototype.hasOwnProperty.call(component, '__KONTUR_REACT_UI__');
  }
}

// all components that are available for import from the react-ui
const PUBLIC_COMPONENTS = Object.keys(ReactUI).filter((name) => {
  return isPublicComponent((ReactUI as any)[name], name);
});

// some components have required props
// so we need this in order to create them dynamically
// also we pass values to inputs to check their forwarding
const DEFAULT_PROPS = {
  Autocomplete: { value: '', onValueChange: vi.fn() },
  FxInput: { onValueChange: vi.fn() },
  CurrencyInput: { onValueChange: vi.fn() },
  CurrencyLabel: { value: '' },
  DatePicker: { onValueChange: vi.fn() },
  ComboBox: { getItems: () => Promise.resolve([]) },
  TokenInput: { type: ReactUI.TokenInputType.Combined, getItems: () => Promise.resolve([]), onValueChange: vi.fn() },
  Radio: { value: '' },
  RadioGroup: { items: [] },
  Dropdown: { caption: 'caption' },
  DropdownMenu: { caption: <button>caption</button> },
  Gapped: { children: '' },
  MenuHeader: { children: '' },
  Paging: { activePage: 0, onPageChange: vi.fn(), pagesCount: 3 },
  Sticky: { side: 'top' },
  Switcher: { items: [] },
  Tabs: { value: '' },
  TooltipMenu: { caption: <button>caption</button> },
  TopBarDropdown: { label: 'label' },
  TopBarUser: { userName: 'name' },
  TopBarOrganizations: { caption: 'caption' },
  Hint: { text: 'Hint', manual: true, opened: true, children: <i /> },
  Tooltip: { trigger: 'opened', render: () => 'Tooltip', children: <i /> },
  Toast: { children: <i /> },
  ResponsiveLayout: { children: <i /> },
  Tab: { id: 'tab' },
  GlobalLoader: { active: true },
  MaskedInput: { mask: '99:99' },
};

// allows rendering Tab not only inside Tabs
// by mocking throwing module
vi.mock('invariant', () => ({
  default: (...args: any[]) => {
    if (args[1] !== 'Tab should be placed inside Tabs component') {
      return vi.importActual('invariant').then((module) => (module.default as any)(...args));
    }
  },
}));

const createWrapper = (compName: string, initProps: AnyObject = {}): RenderResult => {
  const component = (ReactUI as any)[compName];
  const props = { ...(DEFAULT_PROPS as any)[compName], ...initProps };
  return render(React.createElement(component, props));
};

describe('Props Forwarding', () => {
  // check that className, style and data-* are being forwarding
  // correctly into all public components
  describe('Common Props', () => {
    function getTestDOMNode<T>(compName: string, ref: React.RefObject<T>) {
      switch (compName) {
        //root wrapper to far from styled container
        case 'Toast':
          act(() => {
            const strictRef = ref as React.RefObject<Toast>;
            strictRef.current?.push('Toast');
          });
          return screen.getByTestId(props['data-tid']);
        case 'SingleToast':
          act(() => {
            SingleToast.push('SingleToast');
          });
          return screen.getByTestId(props['data-tid']);
        case 'MiniModalHeader':
        case 'MiniModalBody':
        case 'MiniModalFooter':
        case 'ModalHeader':
        case 'ModalFooter': {
          return screen.getByTestId(props['data-tid']);
        }
        default:
          return getRootNode(ref?.current as React.ReactInstance);
      }
    }
    const props = {
      'data-tid': 'my-data-tid',
      'data-testid': 'my-data-testid',
      className: 'my-classname',
      style: {
        width: '95.5%',
        color: 'rgb(255, 0, 0)',
      },
    };

    it.each<[string]>(PUBLIC_COMPONENTS.map((name) => [name]))('%s', async (compName) => {
      const ref = React.createRef();
      createWrapper(compName, { ...props, ref });
      await delay(0);
      const wrapperNode = getTestDOMNode(compName, ref);
      if (!wrapperNode) {
        throw new Error(`Unable to find rootWrapper ${compName}`);
      }
      expect(wrapperNode).toHaveAttribute('data-tid', props['data-tid']);
      expect(wrapperNode).toHaveAttribute('data-testid', props['data-testid']);
      expect(wrapperNode).toHaveClass(props.className);
      const computedStyle = getComputedStyle(wrapperNode);
      Object.entries(props.style).forEach(([key, value]) => {
        const computedValue = computedStyle.getPropertyValue(key);
        expect(computedValue).toBe(value);
      });
    });
  });

  // check that "inputMode" prop gets forwarded to all relevant input-like components
  describe('"inputMode" prop', () => {
    const getNumericWrapper = (compName: string, container: HTMLElement) => {
      switch (compName) {
        case 'ComboBox': {
          const inputLikeText = screen.getByTestId(InputLikeTextDataTids.root);
          if (!inputLikeText) {
            throw new Error(`Can not find inputLikeText in: ${compName}`);
          }
          fireEvent.focus(inputLikeText);
          return screen.getByRole('textbox');
        }
        case 'PasswordInput':
          return container.querySelector(`input[inputmode='numeric']`);
        default:
          return screen.getByRole('textbox');
      }
    };

    it.each([
      'Input',
      'FxInput',
      'CurrencyInput',
      'PasswordInput',
      'Autocomplete',
      'Textarea',
      'ComboBox',
      'TokenInput',
    ])('%s', (compName) => {
      const props = {
        inputMode: 'numeric',
      };
      const { container } = createWrapper(compName, props);
      const wrapper = getNumericWrapper(compName, container);
      expect(wrapper).toHaveAttribute('inputmode', 'numeric');
    });
  });

  // check that the width prop still works
  describe('"width" Prop', () => {
    const width = '99px';
    const getRootWrapper = (compName: string, ref: React.RefObject<React.ReactInstance>) => {
      switch (compName) {
        case 'Modal':
          return screen.getByTestId(ModalDataTids.content).firstChild;
        case 'TokenInput':
          return screen.getByTestId(TokenInputDataTids.label);
        case 'SidePage':
          return screen.getByTestId(SidePageDataTids.root);
        default:
          return getRootNode(ref?.current);
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
    ])('%s', (compName) => {
      const ref = React.createRef<React.ReactInstance>();
      createWrapper(compName, { width, ref });
      const rootWrapper = getRootWrapper(compName, ref);
      if (!rootWrapper) {
        throw new Error(`Unable to find rootWrapper ${compName}`);
      }

      expect(getComputedStyle(rootWrapper as Element).width).toBe(width);
    });
  });
});
