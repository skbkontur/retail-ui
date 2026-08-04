import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import { expect, vi } from 'vitest';

import { MaskedInputV2 } from '../MaskedInputV2.js';

describe('MaskedInputV2 — history', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('undo/redo in controlled mode', () => {
    it('Ctrl+Z rolls back one step', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="9-9-9" value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '12');
      expect(input).toHaveValue('1-2-');

      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('1-');
    });

    it('Ctrl+Z → Ctrl+Y restores value', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="9-9-9" value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '12');
      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('1-');

      await userEvent.keyboard('{Control>}y{/Control}');
      expect(input).toHaveValue('1-2-');
    });

    it('multiple Ctrl+Z rolls back to empty', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="9-9-9" value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      expect(input).toHaveValue('1-2-3');

      await userEvent.keyboard('{Control>}z{/Control}');
      await userEvent.keyboard('{Control>}z{/Control}');
      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('');
    });

    it('Ctrl+Z → Ctrl+Shift+Z restores value', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="9-9-9" value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '12');
      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('1-');

      await userEvent.keyboard('{Control>}{Shift>}z{/Shift}{/Control}');
      expect(input).toHaveValue('1-2-');
    });

    it('limits undo history to 100 steps', async () => {
      const user = userEvent.setup();
      const mask = '9'.repeat(105);
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask={mask} value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      for (let i = 0; i < 101; i++) {
        await user.keyboard('1');
      }

      for (let i = 0; i < 100; i++) {
        await user.keyboard('{Control>}z{/Control}');
      }

      expect(input).not.toHaveValue('');
    });

    it('after paste, Ctrl+Z and blur, value stays rolled back (not reverted to pasted)', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <>
            <MaskedInputV2
              mask="9-9-9-9"
              maskChar="_"
              value={value}
              onValueChange={setValue}
              imaskProps={{ lazy: true }}
            />
            <button type="button">Outside</button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      const outsideButton = screen.getByRole('button', { name: 'Outside' });

      await userEvent.click(input);
      await userEvent.paste('1234');
      expect(input).toHaveValue('1-2-3-4');

      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('');

      await userEvent.click(outsideButton);
      expect(input).toHaveValue('');
    });
  });
});
