import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Radio } from '../Radio';

describe('Radio', () => {
  it('should have label', () => {
    render(<Radio value="radio">label</Radio>);

    expect(screen.getByLabelText('label')).toBeInTheDocument();
  });

  it('input element should be `disabled` when `disabled` prop passed', () => {
    render(
      <Radio disabled value="radio">
        label
      </Radio>,
    );

    expect(screen.getByLabelText('label')).toBeDisabled();
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
    render(<Component />);

    const radio = screen.getByLabelText('label');
    // Initially radio button should not be checked.
    expect(radio).not.toBeChecked();

    userEvent.click(radio);
    // After we click on it, it should become checked.
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
    render(<Component />);

    const radio = screen.getByLabelText('label');
    // Initially disabled radio button should not be checked.
    expect(radio).not.toBeChecked();

    userEvent.click(radio);
    // After we click on it, it still should be not checked as it is disabled.
    expect(radio).not.toBeChecked();
  });

  it('should be checked by default', () => {
    render(
      <Radio checked={true} value="radio">
        label
      </Radio>,
    );

    expect(screen.getByLabelText('label')).toBeChecked();
  });
});
