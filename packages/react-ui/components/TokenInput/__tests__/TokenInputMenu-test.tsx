import { render } from '@testing-library/react';
import React from 'react';

import type * as PopupModule from '../../../internal/Popup/index.js';
import { TokenInputMenu } from '../TokenInputMenu.js';

const popupPositionChanges = vi.hoisted(() => vi.fn());

vi.mock('../../../internal/Popup/index.js', async (importOriginal) => {
  const original = await importOriginal<typeof PopupModule>();
  const React = await import('react');

  return {
    ...original,
    Popup: ({ anchorElement, onPositionChange, children }: PopupModule.PopupProps) => {
      React.useLayoutEffect(() => {
        const position = (anchorElement as HTMLElement).dataset.anchor === 'root' ? 'top left' : 'bottom left';

        popupPositionChanges(position);
        onPositionChange?.(position, true);
      }, [anchorElement, onPositionChange]);

      return <div>{children as React.ReactNode}</div>;
    },
  };
});

describe('<TokenInputMenu />', () => {
  it('does not loop between root and cursor anchors when they produce different popup directions', () => {
    const root = document.createElement('div');
    const cursor = document.createElement('textarea');
    root.dataset.anchor = 'root';
    cursor.dataset.anchor = 'cursor';

    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      right: 200,
      bottom: 100,
      left: 0,
      width: 200,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    });
    vi.spyOn(cursor, 'getBoundingClientRect').mockReturnValue({
      top: 80,
      right: 108,
      bottom: 95,
      left: 100,
      width: 8,
      height: 15,
      x: 100,
      y: 80,
      toJSON: () => undefined,
    });

    render(
      <TokenInputMenu
        opened
        items={[]}
        anchorElementRoot={root}
        anchorElementForCursor={cursor}
        menuAlign="cursor"
        menuWidth="auto"
        renderItem={(item) => item}
        onValueChange={vi.fn()}
      />,
    );

    expect(popupPositionChanges.mock.calls.length).toBeLessThan(5);
    expect(popupPositionChanges).toHaveBeenLastCalledWith('top left');
  });
});
