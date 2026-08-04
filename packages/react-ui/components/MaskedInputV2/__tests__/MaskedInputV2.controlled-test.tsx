import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import { expect, vi } from 'vitest';

import { globalClasses } from '../internal/MaskedInternal.styles.js';
import { MaskedInputV2 } from '../MaskedInputV2.js';
import { expectMask, getMaskedInputParts } from './MaskedInputV2.testUtils.js';

describe('MaskedInputV2 — controlled', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('onValueChange in controlled mode', () => {
    it('fires with masked value on each typed char', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="9-9-9"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '1');
      expect(onValueChange).toHaveBeenLastCalledWith('1-');
      await userEvent.type(input, '2');
      expect(onValueChange).toHaveBeenLastCalledWith('1-2-');
      await userEvent.type(input, '3');
      expect(onValueChange).toHaveBeenLastCalledWith('1-2-3');
    });

    it('fires with empty string on full clear', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="9-9-9"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      onValueChange.mockClear();

      await userEvent.clear(input);
      expect(onValueChange).toHaveBeenCalledWith('');
    });

    it('fires correct value on backspace (partial delete)', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="9-9-9"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      onValueChange.mockClear();

      await userEvent.type(input, '{backspace}');
      expect(onValueChange).toHaveBeenLastCalledWith('1-2-');
    });
  });

  describe('controlled value from props', () => {
    it('updates input when parent changes value via setState', () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <>
            <MaskedInputV2 mask="99:99" value={value} onValueChange={setValue} />
            <button type="button" onClick={() => setValue('12:34')}>
              Fill
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toHaveValue('');
      fireEvent.click(screen.getByRole('button', { name: 'Fill' }));
      expect(input).toHaveValue('12:34');
    });

    it('clears input when parent sets value to empty', () => {
      const Comp = () => {
        const [value, setValue] = useState('12:34');
        return (
          <>
            <MaskedInputV2 mask="99:99" value={value} onValueChange={setValue} />
            <button type="button" onClick={() => setValue('')}>
              Clear
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toHaveValue('12:34');
      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
      expect(input).toHaveValue('');
    });
  });

  describe('unmask=true controlled mode', () => {
    it('onValueChange receives unmasked value on input', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="99:99"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            unmask
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '1');
      expect(onValueChange).toHaveBeenLastCalledWith('1');

      await userEvent.type(input, '2');
      expect(onValueChange).toHaveBeenLastCalledWith('12');

      await userEvent.type(input, '3');
      expect(onValueChange).toHaveBeenLastCalledWith('123');
    });

    it('displays masked value in input while parent holds unmasked', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="99:99" value={value} onValueChange={setValue} unmask />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '1234');
      expect(input).toHaveValue('12:34');
    });

    it('clears correctly with unmask', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="99:99"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            unmask
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '1234');
      onValueChange.mockClear();
      await userEvent.clear(input);
      expect(onValueChange).toHaveBeenCalledWith('');
    });
  });

  describe('alwaysShowMask with controlled value', () => {
    it('shows full mask placeholder initially', () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="99:99" maskChar="_" value={value} onValueChange={setValue} alwaysShowMask />;
      };
      render(<Comp />);
      expectMask('__:__');
    });

    it('shows partial value with mask', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="99:99" maskChar="_" value={value} onValueChange={setValue} alwaysShowMask />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '12');
      expect(input).toHaveValue('12:');
      expectMask('__');
    });

    it('shows full mask after clear', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="99:99" maskChar="_" value={value} onValueChange={setValue} alwaysShowMask />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '1234');
      await userEvent.clear(input);
      expectMask('__:__');
    });

    it('renders long alwaysShowMask in overlay with placeholder color when field overflows', () => {
      const clientWidthSpy = vi.spyOn(HTMLInputElement.prototype, 'clientWidth', 'get').mockReturnValue(70);
      const rectSpy = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          return {
            width: this.tagName === 'SPAN' ? 280 : 70,
            height: 16,
            top: 0,
            left: 0,
            right: this.tagName === 'SPAN' ? 280 : 70,
            bottom: 16,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          } as DOMRect;
        });

      render(<MaskedInputV2 mask={'9'.repeat(25)} alwaysShowMask width={100} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toHaveValue('');
      expectMask('_'.repeat(25));
      expect(getMaskedInputParts().mask).toHaveClass(globalClasses.colored);

      clientWidthSpy.mockRestore();
      rectSpy.mockRestore();
    });

    it('does not add colored class to overlay when colored={false}', () => {
      render(<MaskedInputV2 mask="99:99" alwaysShowMask colored={false} maskChar="_" />);
      const { mask } = getMaskedInputParts();
      expect(mask).not.toHaveClass(globalClasses.colored);
    });

    it('does not copy decorative mask placeholders from empty alwaysShowMask field', async () => {
      const clientWidthSpy = vi.spyOn(HTMLInputElement.prototype, 'clientWidth', 'get').mockReturnValue(70);
      const rectSpy = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          return {
            width: this.tagName === 'SPAN' ? 280 : 70,
            height: 16,
            top: 0,
            left: 0,
            right: this.tagName === 'SPAN' ? 280 : 70,
            bottom: 16,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          } as DOMRect;
        });

      const user = userEvent.setup();
      render(<MaskedInputV2 mask={'9'.repeat(25)} alwaysShowMask width={100} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      input.setSelectionRange(0, 25);
      fireEvent.select(input);

      const setData = vi.fn();
      fireEvent.copy(input, { clipboardData: { setData, getData: vi.fn() } });

      expect(input).toHaveValue('');
      expect(setData).toHaveBeenCalledWith('text/plain', '');

      clientWidthSpy.mockRestore();
      rectSpy.mockRestore();
    });
  });

  describe('dynamic mask change', () => {
    it('keeps omitted IMask default tokens as literals after mask change', () => {
      const Comp = () => {
        const [mask, setMask] = useState('a.vasenk**@skbkontur.ru');
        return (
          <>
            <MaskedInputV2
              mask={mask}
              maskChar="_"
              alwaysShowMask
              formatChars={{
                '9': '[0-9]',
                '*': '[a-zA-Z0-9]',
              }}
            />
            <button type="button" onClick={() => setMask('a-vasenk**@skbkontur.ru')}>
              Change mask
            </button>
          </>
        );
      };

      render(<Comp />);
      expectMask('a.vasenk__@skbkontur.ru');

      fireEvent.click(screen.getByRole('button', { name: 'Change mask' }));
      expectMask('a-vasenk__@skbkontur.ru');
    });

    it('re-formats value when mask changes', () => {
      const Comp = () => {
        const [mask, setMask] = useState('99:99');
        const [value, setValue] = useState('12:34');
        return (
          <>
            <MaskedInputV2 mask={mask} value={value} onValueChange={setValue} />
            <button type="button" onClick={() => setMask('99-99')}>
              Change mask
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input).toHaveValue('12:34');

      fireEvent.click(screen.getByRole('button', { name: 'Change mask' }));
      expect(input).toHaveValue('12-34');
    });

    it('keeps caret position on dynamic mask change with unmask', async () => {
      const Comp = () => {
        const [value, setValue] = useState('123');
        const [mask, setMask] = useState('99-99');

        return (
          <>
            <MaskedInputV2 mask={mask} value={value} onValueChange={setValue} unmask />
            <button type="button" onClick={() => setMask('99-99-99')}>
              Change mask
            </button>
          </>
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      input.setSelectionRange(1, 1);
      fireEvent.select(input);
      await userEvent.click(screen.getByRole('button', { name: 'Change mask' }));

      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('clears undo history when mask changes', async () => {
      const Comp = () => {
        const [mask, setMask] = useState('999');
        const [value, setValue] = useState('');
        return (
          <>
            <MaskedInputV2 mask={mask} value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />
            <button type="button" onClick={() => setMask('99-99')}>
              Change mask
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      expect(input).toHaveValue('123');

      fireEvent.click(screen.getByRole('button', { name: 'Change mask' }));
      expect(input).toHaveValue('12-3');

      await userEvent.keyboard('{Control>}z{/Control}');
      expect(input).toHaveValue('12-3');
    });
  });

  describe('controlled value edge cases', () => {
    it('value with only fixed mask chars results in empty display', () => {
      render(<MaskedInputV2 mask="+7 999" value="+7 " />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('does not fire onValueChange when parent sets the same value', () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('12');
        return (
          <>
            <MaskedInputV2
              mask="99:99"
              value={value}
              onValueChange={(v) => {
                setValue(v);
                onValueChange(v);
              }}
            />
            <button onClick={() => setValue('12')}>Set same</button>
          </>
        );
      };
      render(<Comp />);
      onValueChange.mockClear();
      fireEvent.click(screen.getByRole('button', { name: 'Set same' }));
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('updates input when parent changes value while focused', () => {
      const Comp = () => {
        const [value, setValue] = useState('12');
        return (
          <>
            <MaskedInputV2 mask="99:99" value={value} onValueChange={setValue} />
            <button onClick={() => setValue('34')}>Change</button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      fireEvent.click(screen.getByRole('button', { name: 'Change' }));
      expect(input).toHaveValue('34:');
    });

    it('priority of value over defaultValue', () => {
      render(<MaskedInputV2 mask="99:99" value="12" defaultValue="34" />);
      expect(screen.getByRole('textbox')).toHaveValue('12:');
    });

    it('re-extracts raw when mask changes but controlled value stays the same', () => {
      const { rerender } = render(<MaskedInputV2 mask="999" value="123" />);
      expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveValue('123');

      rerender(<MaskedInputV2 mask="99:99" value="123" />);
      expect(screen.getByRole<HTMLInputElement>('textbox')).toHaveValue('12:3');
    });
  });

  describe('prop combinations', () => {
    it('alwaysShowMask={true} + unmask={true}: visual mask stays, onValueChange gets clean', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="99:99"
            alwaysShowMask
            unmask
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      await user.type(input, '1234');
      expect(input).toHaveValue('12:34');
      expect(onValueChange).toHaveBeenLastCalledWith('1234');
    });

    it('onBeforePasteValue + unmask: filtered paste results in correct unmasked value', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="99:99"
            unmask
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            onBeforePasteValue={(v) => v.replace(/[^0-9]/g, '')}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      await user.paste('a1b2c3');
      expect(input).toHaveValue('12:3');
      expect(onValueChange).toHaveBeenLastCalledWith('123');
    });

    it('error + alwaysShowMask={false} + blur: error state persists', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" error alwaysShowMask={false} value="12" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.blur();
      expect(input).toHaveValue('12:');
      expect(container.querySelector('label')).toBeInTheDocument();
    });
  });

  describe('simultaneous prop changes', () => {
    it('changing mask + value + alwaysShowMask at the same time does not crash', () => {
      const Comp = () => {
        const [config, setConfig] = useState({ mask: '99:99', value: '12:34', alwaysShowMask: false });
        return (
          <>
            <MaskedInputV2 {...config} onValueChange={() => {}} />
            <button onClick={() => setConfig({ mask: '99-99', value: '12-34', alwaysShowMask: true })}>
              Change all
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input).toHaveValue('12:34');
      fireEvent.click(screen.getByRole('button', { name: 'Change all' }));
      expect(input).toHaveValue('12-34');
    });
  });
});
