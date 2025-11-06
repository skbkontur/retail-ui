import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RenderLayer } from '../RenderLayer';

describe('<RenderLayer />', () => {
  const mockOnClickOutside = vi.fn();
  const mockOnFocusOutside = vi.fn();
  const mockGetAnchorElement = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('active enabled by default, not breaking render without props', () => {
    const { container } = render(
      <RenderLayer>
        <div>Тестовый контент</div>
      </RenderLayer>,
    );

    expect(container.firstChild).toBeTruthy();
  });

  it('call onClickOutside on click outside', async () => {
    render(
      <RenderLayer onClickOutside={mockOnClickOutside}>
        <button>Кнопка внутри</button>
      </RenderLayer>,
    );

    await userEvent.click(screen.getByText('Кнопка внутри'));
    expect(mockOnClickOutside).not.toHaveBeenCalled();

    await userEvent.click(document.body);
    expect(mockOnClickOutside).toHaveBeenCalled();
  });

  it('call onFocusOutside on lost focus', async () => {
    render(
      <div>
        <input data-tid="outer-input" type="text" />
        <RenderLayer onFocusOutside={mockOnFocusOutside}>
          <input data-tid="inner-input" type="text" />
        </RenderLayer>
      </div>,
    );

    await userEvent.click(screen.getByTestId('inner-input'));
    await userEvent.click(screen.getByTestId('outer-input'));

    expect(mockOnFocusOutside).toHaveBeenCalled();
  });

  it('add event listeners on mount', () => {
    const addEventListenerSpy = vi.spyOn(global, 'addEventListener');

    render(
      <RenderLayer active onClickOutside={mockOnClickOutside} onFocusOutside={mockOnFocusOutside}>
        <div />
      </RenderLayer>,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
  });

  it('disable event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(global, 'removeEventListener');
    const { unmount } = render(
      <RenderLayer active onClickOutside={mockOnClickOutside} onFocusOutside={mockOnFocusOutside}>
        <div />
      </RenderLayer>,
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
  });

  it('call getAnchorElement', () => {
    mockGetAnchorElement.mockReturnValue(document.createElement('div'));

    render(
      <RenderLayer getAnchorElement={mockGetAnchorElement} onClickOutside={mockOnClickOutside}>
        <div />
      </RenderLayer>,
    );

    expect(mockGetAnchorElement).toHaveBeenCalled();
  });
});
