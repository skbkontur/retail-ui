import React, { InputHTMLAttributes } from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Input } from '../Input';
import { FxInput } from '../FxInput';
import { CurrencyInput } from '../CurrencyInput';
import { PasswordInput } from '../PasswordInput';
import { Autocomplete } from '../Autocomplete';
import { DateInput } from '../DateInput';
import { ComboBox } from '../ComboBox';
import { InputLikeText } from '../../internal/InputLikeText';
import { isFunction } from '../../lib/utils';

const EVENTS_LIST = [
  // Clipboard Events
  'onCopy',
  'onCopyCapture',
  'onCut',
  'onCutCapture',
  'onPaste',
  'onPasteCapture',
  // Focus Events
  'onFocus',
  'onFocusCapture',
  'onBlur',
  'onBlurCapture',
  // Form Events
  'onChange',
  'onChangeCapture',
  'onBeforeInput',
  'onBeforeInputCapture',
  'onInput',
  'onInputCapture',
  'onInvalid',
  'onInvalidCapture',
  // Keyboard Events
  'onKeyDown',
  'onKeyDownCapture',
  'onKeyPress',
  'onKeyPressCapture',
  'onKeyUp',
  'onKeyUpCapture',
  // MouseEvents
  'onClick',
  'onClickCapture',
  'onDoubleClick',
  'onDoubleClickCapture',
  'onMouseDown',
  'onMouseDownCapture',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseMoveCapture',
  'onMouseOut',
  'onMouseOutCapture',
  'onMouseOver',
  'onMouseOverCapture',
  'onMouseUp',
  'onMouseUpCapture',
];

const createEvent = (type: string, target = document.createElement('input')): Event => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);

  Object.defineProperties(event, {
    target: { value: target },
    currentTarget: { value: target },
    persist: { value: () => void 0 },
  });

  if (event.type === 'onpaste') {
    // needed for CurrecyInput's handlePaste
    Object.defineProperties(event, {
      clipboardData: {
        value: {
          getData: () => '',
        },
      },
    });
  }

  return event;
};

const getEventType = (eventName: string): string => {
  return eventName.toLowerCase().replace('capture', '');
};

const clickOutside = () => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
};

describe.each<[string, () => ReactWrapper]>([
  ['Input', () => mount(<Input />)],
  ['FxInput', () => mount(<FxInput onValueChange={jest.fn()} />)],
  ['CurrncyInput', () => mount(<CurrencyInput onValueChange={jest.fn()} />)],
  ['PasswordInput', () => mount(<PasswordInput />)],
  ['Autocomplete', () => mount(<Autocomplete value="" onValueChange={jest.fn()} />)],
  ['InputLikeText', () => mount(<InputLikeText />)],
  ['DateInput', () => mount(<DateInput />)],
  ['ComboBox', () => mount(<ComboBox getItems={() => Promise.resolve([])} />)],
  [
    'ComboBoxInFocus',
    () => {
      const wrapper = mount(<ComboBox getItems={() => Promise.resolve([])} />);
      // @ts-ignore
      wrapper.find('ComboBoxView').prop('onFocus')();
      return wrapper;
    },
  ],
])('%s', (title, render) => {
  beforeAll(() => {
    // mock for InputLikeText's handleBlur
    window.getSelection = () => null;
  });
  it('passes props to input', () => {
    const props: InputHTMLAttributes<HTMLInputElement> = {
      autoFocus: true,
      disabled: true,
      id: 'someId',
      title: 'someTitle',
      form: '',
      formAction: '',
      formEncType: '',
      formMethod: '',
      formNoValidate: true,
      formTarget: '',
      tabIndex: 0,
      name: '',
      readOnly: true,
      required: true,
      'aria-label': '',
      'aria-labelledby': '',
    };

    if (title === 'InputLikeText' || title === 'DateInput' || title === 'ComboBox') {
      delete props.tabIndex;
    }

    const wrapper = render().setProps(props);

    expect(wrapper.find('input').props()).toMatchObject(props);
  });

  it('passes props to wrapper', () => {
    const props = {
      'data-tid': 'data-tid',
      'data-testid': 'data-testid',
      className: 'my-classname',
      style: {
        width: '100%',
        color: 'red',
      },
    };
    const wrapperNode = render()
      .setProps(props)
      .getDOMNode();

    expect(wrapperNode.getAttribute('data-tid')).toBe(props['data-tid']);
    expect(wrapperNode.getAttribute('data-testid')).toBe(props['data-testid']);
    expect(wrapperNode.classList.contains(props.className)).toBe(true);
    expect(getComputedStyle(wrapperNode)).toMatchObject(props.style);
  });

  describe('calls passed handlers', () => {
    const getTargetSelector = (eventName: string, title: string) => {
      switch (true) {
        case title === 'InputLikeText' || title === 'DateInput':
          return 'span[tabIndex=0]';
        case eventName === 'onMouseEnter':
        case eventName === 'onMouseLeave':
        case eventName === 'onMouseOver':
          return title.startsWith('ComboBox') ? 'RenderLayer > span' : 'Input > label';
        case title === 'ComboBox':
          return 'span[tabIndex=0]';
        default:
          return 'input';
      }
    };
    it.each(EVENTS_LIST)('%s', eventName => {
      const userHandler = jest.fn();
      const wrapper = render().setProps({ [eventName]: userHandler });
      const targetHandler = wrapper.find(getTargetSelector(eventName, title)).prop(eventName);

      if (isFunction(targetHandler)) {
        targetHandler(createEvent(getEventType(eventName)));
      }

      if (title === 'Autocomplete' && eventName == 'onBlur') {
        //@ts-ignore
        wrapper.find('input').prop('onFocus')?.();
        clickOutside();
      }

      if (title === 'ComboBoxInFocus' && eventName === 'onFocus') {
        expect(userHandler).not.toHaveBeenCalled();
      } else {
        expect(userHandler).toHaveBeenCalled();
      }
    });
  });
});
