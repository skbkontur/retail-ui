import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
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

  it('should check and uncheck', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);

      return (
        <Radio onClick={() => setIsChecked(!isChecked)} checked={isChecked} value="radio">
          label
        </Radio>
      );
    };

    const { getByLabelText } = render(<Component />);

    const radio = getByLabelText('label');

    expect(radio).not.toBeChecked();

    userEvent.click(radio);

    expect(radio).toBeChecked();
  });

  it('should not check if disabled', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);

      return (
        <Radio disabled onClick={() => setIsChecked(!isChecked)} checked={isChecked} value="radio">
          label
        </Radio>
      );
    };

    const { getByLabelText } = render(<Component />);

    const radio = getByLabelText('label');

    expect(radio).not.toBeChecked();

    userEvent.click(radio);

    expect(radio).not.toBeChecked();
  });

  it('should be checked by default', () => {
    const { getByLabelText } = render(
      <Radio checked={true} value="radio">
        label
      </Radio>,
    );

    const radio = getByLabelText('label');

    expect(radio).toBeChecked();
  });
});
