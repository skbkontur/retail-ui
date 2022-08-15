import React from 'react';
import { mount } from 'enzyme';

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
});
