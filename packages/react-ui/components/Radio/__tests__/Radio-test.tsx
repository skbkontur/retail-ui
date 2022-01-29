import React from 'react';
import { render } from '@testing-library/react';

import { Radio } from '../Radio';

describe('Radio', () => {
  it('has label', () => {
    const { getByLabelText } = render(<Radio value="radio">label</Radio>);

    getByLabelText('label');
  });

  it('input element should be `disabled` when `disabled` prop passed', () => {
    const { getByLabelText } = render(
      <Radio disabled value="radio">
        label
      </Radio>,
    );

    const radio = getByLabelText('label');

    expect(radio).toBeDisabled();
  });
});
