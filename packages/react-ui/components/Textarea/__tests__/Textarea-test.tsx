import React from 'react';
import { mount } from 'enzyme';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('render without crash', () => {
    const wrapper = mount<Textarea>(<Textarea />);

    expect(wrapper).toHaveLength(1);
  });

  it('setSelectionRange works', () => {
    const wrapper = mount<Textarea>(<Textarea value={'text here'} />, {
      attachTo: document.getElementById('enzymeContainer'),
    });
    const SELECTION_START = 0;
    const SELECTION_END = 4;

    wrapper.instance().setSelectionRange(SELECTION_START, SELECTION_END);

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(SELECTION_START);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(SELECTION_END);
  });

  it('selectAll works by method', () => {
    const VALUE = 'Text for test';
    const wrapper = mount<Textarea>(<Textarea value={VALUE} />, {
      attachTo: document.getElementById('enzymeContainer'),
    });

    wrapper.instance().selectAll();

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(VALUE.length);
  });

  it('selectAllOnFocus prop works', () => {
    const VALUE = 'selectAllOnFocus prop works';
    const wrapper = mount<Textarea>(<Textarea value={VALUE} selectAllOnFocus />, {
      attachTo: document.getElementById('enzymeContainer'),
    });

    wrapper.find('textarea').simulate('focus');

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(VALUE.length);
  });

  it('manual focus', () => {
    const wrapper = mount<Textarea>(<Textarea />, { attachTo: document.getElementById('enzymeContainer') });

    expect(document.activeElement).toBeInstanceOf(HTMLBodyElement);

    wrapper.instance().focus();

    expect(document.activeElement).toBe(wrapper.find('textarea').instance());
  });
});
