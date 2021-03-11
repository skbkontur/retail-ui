import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import * as ReactUI from '../../index';

// all components that are available for import from the react-ui
const PUBLIC_COMPONENTS = Object.keys(ReactUI).filter(name => {
  return (
    isPublicComponent((ReactUI as any)[name]) &&
    !['LocaleProvider', 'LocaleConsumer', 'ThemeProvider', 'ThemeConsumer'].includes(name)
  );
});

// some components have required props
// so we need this in order to create them dynamically
// also we pass values to inputs to check their forwarding
const DEFAULT_PROPS = {
  Autocomplete: { value: 'value', onValueChange: jest.fn() },
  FxInput: { value: 'value', onValueChange: jest.fn() },
  CurrencyInput: { value: 0, onValueChange: jest.fn() },
  CurrencyLabel: { value: '' },
  DatePicker: { value: '00.00.0000', onValueChange: jest.fn() },
  ComboBox: { value: { label: 'value', value: 0 }, getItems: () => Promise.resolve([]) },
  TokenInput: {
    type: ReactUI.TokenInputType.Combined,
    getItems: () => Promise.resolve([]),
    onValueChange: jest.fn(),
    selectedItems: ['one', 'two'],
  },
  Radio: { value: 'value' },
  RadioGroup: { items: [] },
  Dropdown: { caption: 'caption' },
  DropdownMenu: { caption: 'caption' },
  Fias: { baseUrl: '/' },
  FiasSearch: { api: new ReactUI.FiasAPI('/') },
  Gapped: { children: '' },
  MenuHeader: { children: '' },
  Paging: { activePage: 0, onPageChange: jest.fn(), pagesCount: 0 },
  Sticky: { side: 'top' },
  Switcher: { value: 'value', items: [] },
  Tabs: { value: '' },
  TooltipMenu: { caption: 'caption' },
  TopBarDropdown: { label: 'label' },
  TopBarUser: { userName: 'name' },
  TopBarOrganizations: { caption: 'caption' },
  Hint: { text: 'Hint', manual: true, opened: true, children: <i /> },
  Tooltip: { trigger: 'opened', render: () => 'Tooltip', children: <i /> },
  Toast: { children: <i /> },
  Tab: { id: 'tab' },
  Input: { value: 'value' },
  Toggle: { value: 'value' },
  Checkbox: { value: 'value' },
  PasswordInput: { value: 'value' },
  Select: { value: 'value' },
  Button: { value: 'value' },
  Textarea: { value: 'value' },
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

describe('Props Forwarding', () => {
  // check that className, style and data-* are being forwarding
  // correctly into all public components
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
      },
    );
  });

  // check props that are relevant for form elements
  describe("Form Element's Props", () => {
    const getTestWrapper = (compName: string, wrapper: ReactWrapper) => {
      switch (compName) {
        case 'Button':
          return wrapper.find('button');
        default:
          return wrapper.find('input');
      }
    };
    const getProps = (): React.InputHTMLAttributes<HTMLInputElement> => ({
      // global attributes
      id: 'my-id',
      tabIndex: 15,
      inputMode: 'email',

      // form elements
      autoComplete: 'my-autocomplete',
      autoFocus: true,
      disabled: true,
      name: 'my-name',
      form: 'my-form',

      // accessibility
      'aria-label': 'label',
      'aria-labelledby': 'element',
    });

    it.each<keyof typeof ReactUI>([
      'Input',
      'FxInput',
      'CurrencyInput',
      'PasswordInput',
      'Autocomplete',
      'DateInput',
      'DatePicker',
      'Checkbox',
      'Radio',
      'Switcher',
      'Toggle',
      'Button',
    ])('%s', compName => {
      const props = getProps();
      const wrapper = createWrapper(compName, props);
      const testWrapper = getTestWrapper(compName, wrapper);

      expect(testWrapper.props()).toMatchObject(props);
      expect(testWrapper.prop('value')).toBeDefined();
    });

    it('Select', () => {
      // Select contains separated Button and <input />.
      // Button makes his look and process user's interactions.
      // <input /> stores his value and operates with forms.

      const props = getProps();

      const wrapper = createWrapper('Select', props);
      const input = wrapper.find('input');
      const button = wrapper.find('button');

      const { name, form, disabled } = props;
      const inputProps = { name, form, disabled };

      const buttonProps = getProps();
      delete buttonProps.form;
      delete buttonProps.name;

      expect(button.props()).toMatchObject(buttonProps);
      expect(input.props()).toMatchObject(inputProps);
      expect(input.prop('value')).toBeDefined();
    });

    it('ComboBox', () => {
      // Note: the autoFocus prop is set in true in test props

      const props = getProps();
      const wrapper = createWrapper('ComboBox', props);

      const textInput = wrapper.find('input:not([readOnly])');
      const valueInput = wrapper.find('input[readOnly]');

      const { name, form, disabled } = props;
      const valueInputProps = { name, form, disabled };

      const textInputProps = getProps();
      delete textInputProps.form;
      delete textInputProps.name;

      expect(textInput.props()).toMatchObject(textInputProps);
      expect(valueInput.props()).toMatchObject(valueInputProps);
      expect(valueInput.prop('value')).toBeDefined();
    });

    it('TokenInput', () => {
      // TokenInput contains textarea to input text and separate
      // hidden input that stores his value and operates with forms

      const props = getProps();
      const wrapper = createWrapper('TokenInput', props);
      const textarea = wrapper.find('textarea');
      const input = wrapper.find('input[readOnly]');

      const { name, form, disabled } = props;
      const inputProps = { name, form, disabled };

      const textareaProps = getProps();
      delete textareaProps.form;
      delete textareaProps.name;

      expect(textarea.props()).toMatchObject(textareaProps);
      expect(input.props()).toMatchObject(inputProps);
      expect(input.prop('value')).toBeDefined();
    });
  });

  // check props that are input-specific only
  describe("Input's Specific Props", () => {
    it.each<keyof typeof ReactUI>([
      'Input',
      'FxInput',
      'Autocomplete',
      'ComboBox',
      // 'TokenInput', // could be here but it uses <textarea /> instead of <input />
    ])('%s', compName => {
      const props: React.InputHTMLAttributes<HTMLInputElement> = {
        list: 'my-list',
        max: 15,
        maxLength: 15,
        min: 15,
        minLength: 15,
        multiple: true,
        pattern: '*',
        placeholder: 'my-placeholder',
        readOnly: true,
        step: '15',
        type: 'tel',
        required: true,
      };
      const wrapper = createWrapper(compName, props);

      if (compName === 'ComboBox') {
        // ComboBox renders <InputLikeText /> while not in focus
        // and the real <input /> otherwise.
        // Also it has a separate hidden input to store the value.
        // Here we need the visible one.

        wrapper.find('span[tabIndex]').simulate('focus');
        expect(
          wrapper
            .find('input')
            .not('[type="hidden"]')
            .props(),
        ).toMatchObject(props);
      } else {
        expect(wrapper.find('input').props()).toMatchObject(props);
      }
    });
  });

  // check that the width prop still works
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
      const wrapper = createWrapper(compName, { width });
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
