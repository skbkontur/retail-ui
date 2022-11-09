import React, { useState } from 'react';
import { render as renderRTL, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';

import { FxInput, FxInputProps } from '../FxInput';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

const render = (
  props: FxInputProps = {
    onValueChange: () => {
      /**/
    },
  },
) => mount<FxInput, FxInputProps>(<FxInput {...props} />, { attachTo: getAttachedTarget() });

describe('FxInput', () => {
  buildMountAttachTarget();

  it('render without crash', () => {
    expect(render).not.toThrow();
  });

  it('programmatically set focus and blur', () => {
    const wrapper = render();
    const input = wrapper.find('input');

    wrapper.instance().focus();

    expect(input.instance()).toHaveFocus();

    wrapper.instance().blur();

    expect(document.body).toHaveFocus();
  });

  it.each(['', undefined])('should clear the value when %s passed', (testValue) => {
    const Comp = () => {
      const [value, setValue] = useState<string | undefined>('12345');

      return (
        <>
          <FxInput value={value} onValueChange={setValue} />
          <button onClick={() => setValue(testValue)}>Clear</button>
        </>
      );
    };

    renderRTL(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12345');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    userEvent.type(input, '123');
    expect(input).toHaveValue('123');
  });
});
