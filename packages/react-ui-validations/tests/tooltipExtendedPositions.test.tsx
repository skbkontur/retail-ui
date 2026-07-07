import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { tooltip } from '../src/ErrorRenderer.js';
import { ValidationsFeatureFlagsContext } from '../src/utils/featureFlagsContext/ValidationsFeatureFlagsContext.js';
import type { ValidationInfo } from '../src/ValidationWrapper.js';
import { ValidationWrapper } from '../src/ValidationWrapper.js';
import type { Nullable } from '../typings/Types.js';

const warningMock = vi.hoisted(() => vi.fn());

vi.mock('warning', () => ({
  default: (...args: unknown[]) => warningMock(...args),
}));

const validate = (): Nullable<ValidationInfo> => {
  return { message: 'Только цифры', type: 'immediate' };
};

const hasExtendedPositionWarning = (calls: unknown[][]) => {
  return calls.some((call) => {
    const condition = call[0];
    const message = call[1];

    return condition === false && String(message).includes('Extended tooltip position');
  });
};

describe('tooltip extended positions', () => {
  beforeEach(() => {
    warningMock.mockClear();
  });

  it('warns for extended position when feature flag is disabled', async () => {
    render(
      <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('top')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.hover(screen.getByRole('textbox'));

    expect(
      warningMock.mock.calls.some((call) => {
        const condition = call[0];
        const message = call[1];

        return (
          condition === false &&
          String(message).includes("Extended tooltip position 'top' requires validationTooltipExtendedPositions")
        );
      }),
    ).toBe(true);
  });

  it('does not warn for extended position when feature flag is enabled', async () => {
    render(
      <ValidationsFeatureFlagsContext.Provider value={{ validationTooltipExtendedPositions: true }}>
        <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('top')}>
          <Input />
        </ValidationWrapper>
      </ValidationsFeatureFlagsContext.Provider>,
    );

    await userEvent.hover(screen.getByRole('textbox'));

    expect(hasExtendedPositionWarning(warningMock.mock.calls)).toBe(false);
  });

  it('does not warn for standard position when feature flag is disabled', async () => {
    render(
      <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('top left')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.hover(screen.getByRole('textbox'));

    expect(hasExtendedPositionWarning(warningMock.mock.calls)).toBe(false);
  });
});
