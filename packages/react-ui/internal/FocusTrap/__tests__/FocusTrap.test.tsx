import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';

import { clickOutside } from '../../../lib/utils';
import { FocusTrap } from '../FocusTrap';

describe('<FocusTrap>', () => {
  let onBlur: ReturnType<typeof vi.fn>;
  let onButtonBlur: ReturnType<typeof vi.fn>;
  let focusTrap: RenderResult;

  beforeEach(() => {
    onBlur = vi.fn();
    onButtonBlur = vi.fn();
    focusTrap = render(
      <FocusTrap onBlur={onBlur}>
        <div>
          <button onBlur={onButtonBlur} />
          <button onBlur={onButtonBlur} />
        </div>
      </FocusTrap>,
    );
  });

  it('Blur not be called', () => {
    const firstButton = focusTrap.getAllByRole('button')[0];
    const secondButton = focusTrap.getAllByRole('button')[1];

    firstButton.focus();
    firstButton.blur();
    secondButton.blur();

    expect(onButtonBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
  });

  it('Blur called one time with clickOutside', () => {
    const firstButton = focusTrap.getAllByRole('button')[0];
    const secondButton = focusTrap.getAllByRole('button')[1];

    firstButton.focus();
    firstButton.blur();
    secondButton.blur();

    clickOutside('touchstart');

    expect(onButtonBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
