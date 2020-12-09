import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Input } from '../Input';
import { FxInput } from '../FxInput';
import { CurrencyInput } from '../CurrencyInput';
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
  });

  // needed for CurrecyInput's handlePaste
  if (type === 'onpaste') {
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

describe.each<[string, () => ReactWrapper]>([
  ['Input', () => mount(<Input />)],
  ['FxInput', () => mount(<FxInput onValueChange={jest.fn()} />)],
  ['CurrncyInput', () => mount(<CurrencyInput onValueChange={jest.fn()} />)],
])('%s', (title, render) => {
  it('passes props to input', () => {
    const props = {
      autoFocus: true,
      disabled: true,
      id: 'someId',
      // maxLength: 10,
      // placeholder: 'somePlaceholder',
      title: 'someTitle',
      // autoComplete: '',
      form: '',
      formAction: '',
      formEncType: '',
      formMethod: '',
      formNoValidate: true,
      formTarget: '',
      tabIndex: 0,
      // inputMode: 'text' as InputProps['inputMode'],
      // list: '',
      // max: '',
      // min: '',
      // minLength: 0,
      // multiple: true,
      name: '',
      // pattern: '',
      readOnly: true,
      required: true,
      // step: '',
      // type: 'text' as InputProps['type'],

      // defaultValue: '',

      'aria-label': '',
      'aria-labelledby': '',
    };

    const wrapper = render().setProps(props);
    const inputProps = wrapper.find('input').props();

    for (const prop in props) {
      if (props[prop as keyof typeof props]) {
        expect(inputProps[prop as keyof typeof props]).toBe(props[prop as keyof typeof props]);
      }
    }
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
    const getTargetSelector = (eventName: string) => {
      switch (eventName) {
        case 'onMouseEnter':
        case 'onMouseLeave':
        case 'onMouseOver':
          return 'Input > label';
        default:
          return 'input';
      }
    };
    it.each(EVENTS_LIST)('%s', eventName => {
      const userHandler = jest.fn();
      const wrapper = render().setProps({ [eventName]: userHandler });
      const targetHandler = wrapper.find(getTargetSelector(eventName)).prop(eventName);

      if (isFunction(targetHandler)) {
        targetHandler(createEvent(getEventType(eventName)));
      }
      expect(userHandler).toHaveBeenCalled();
    });
  });
});
