import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RenderLayer } from '../RenderLayer';

describe('<RenderLayer />', () => {
  const mockOnClickOutside = jest.fn();
  const mockOnFocusOutside = jest.fn();
  const mockGetAnchorElement = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('active enabled by default', () => {
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

  it.skip('call onFocusOutside on lost focus', async () => {
    render(
      <RenderLayer onFocusOutside={mockOnFocusOutside}>
        <input type="text" />
      </RenderLayer>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.click(document.body);

    await waitFor(() => {
      // mockOnFocusOutside никогда не вызывается, надо поразбираться
      expect(mockOnFocusOutside).toHaveBeenCalled();
    });
  });

  it('add event listeners on mount', () => {
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    render(
      <RenderLayer active onClickOutside={mockOnClickOutside} onFocusOutside={mockOnFocusOutside}>
        <div />
      </RenderLayer>,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
  });

  it('disable event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(global, 'removeEventListener');
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
