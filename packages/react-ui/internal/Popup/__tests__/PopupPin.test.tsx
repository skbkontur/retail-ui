import { render, screen } from '@testing-library/react';
import React from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme.js';
import { PopupDataTids } from '../Popup.js';
import { PopupPin } from '../PopupPin.js';

const warningMock = vi.hoisted(() => vi.fn());

vi.mock('warning', () => ({
  default: (...args: unknown[]) => warningMock(...args),
}));

vi.mock('../../../lib/dom/getDOMRect.js', () => ({
  getDOMRect: () => ({
    width: 200,
    height: 100,
    top: 0,
    left: 0,
    right: 200,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }),
}));

const renderPopupPin = (popupPosition: string) => {
  const popupElement = document.createElement('div');

  render(
    <ThemeContext.Provider value={LIGHT_THEME}>
      <PopupPin backgroundColor="#fff" offset={12} popupElement={popupElement} popupPosition={popupPosition} size={8} />
    </ThemeContext.Provider>,
  );

  return popupElement;
};

describe('PopupPin', () => {
  beforeEach(() => {
    warningMock.mockClear();
  });

  it.each(['left middle', 'left top', 'right middle', 'right bottom'])(
    'does not warn about invalid horizontal align for %s',
    (popupPosition) => {
      renderPopupPin(popupPosition);

      expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();
      expect(
        warningMock.mock.calls.some(([condition, message]) => {
          return condition === false && String(message).includes("Can't get left coordinate: invalid align");
        }),
      ).toBe(false);
    },
  );

  it.each(['top center', 'top left', 'bottom right'])('does not warn about invalid align for %s', (popupPosition) => {
    renderPopupPin(popupPosition);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();
    expect(warningMock).not.toHaveBeenCalled();
  });
});
