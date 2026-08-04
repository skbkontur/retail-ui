import { fireEvent, render, screen, act } from '@testing-library/react';
import React, { useMemo, useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { InputElement } from '../../../Input/Input.typings.js';
import { MaskedCore } from '../MaskedCore.js';
import { globalClasses } from '../MaskedInternal.styles.js';
import { useMaskEngine } from '../useMaskEngine.js';

function createRect(left: number, width = 100): DOMRect {
  return {
    left,
    top: 0,
    width,
    height: 20,
    right: left + width,
    bottom: 20,
    x: left,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
}

function MaskedCoreHarness() {
  const maskedCoreRef = useRef<InputElement | null>(null);
  const coreInputRef = useRef<HTMLInputElement>(null);
  const engine = useMaskEngine({
    mask: '99:99',
    maskChar: '_',
    unmask: true,
    alwaysShowMask: true,
  });
  const [raw, setRaw] = useState('');
  const [focused, setFocused] = useState(false);
  const maskState = useMemo(() => engine.compute(raw, focused), [engine, raw, focused]);

  return (
    <MaskedCore
      ref={maskedCoreRef}
      coreInputRef={coreInputRef}
      maskState={maskState}
      slotMap={engine.slotMap}
      engine={engine}
      focused={focused}
      currentRaw={raw}
      onRawChange={(nextRaw) => setRaw(nextRaw)}
      onUnexpectedInput={() => undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="masked core"
    />
  );
}

function MaskedCoreAlignHarness({ textAlign }: { textAlign: 'right' | 'center' | 'left' }) {
  const coreInputRef = useRef<HTMLInputElement>(null);
  const engine = useMaskEngine({
    mask: '999999',
    maskChar: '_',
    unmask: true,
    alwaysShowMask: true,
  });
  const [raw, setRaw] = useState('');
  const [focused, setFocused] = useState(true);
  const maskState = useMemo(() => engine.compute(raw, focused), [engine, raw, focused]);

  return (
    <MaskedCore
      coreInputRef={coreInputRef}
      maskState={maskState}
      slotMap={engine.slotMap}
      engine={engine}
      focused={focused}
      currentRaw={raw}
      onRawChange={(nextRaw) => setRaw(nextRaw)}
      onUnexpectedInput={() => undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ textAlign }}
      aria-label="masked core align"
    />
  );
}

describe('MaskedCore', () => {
  it('renders input and overlay for empty alwaysShowMask value', () => {
    render(<MaskedCoreHarness />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByTestId('masked-input-overlay')).toHaveTextContent('__:__');
  });

  it('updates raw value on typing', () => {
    render(<MaskedCoreHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '1', selectionStart: 1, selectionEnd: 1 } });

    expect(input.value).toBe('1');
    expect(screen.getByTestId('masked-input-overlay')).toHaveTextContent('1');
  });

  it('hides overlay when value overflows input width', () => {
    const clientWidthSpy = vi.spyOn(HTMLInputElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        return {
          width: this.tagName === 'SPAN' ? 500 : 100,
          height: 16,
          top: 0,
          left: 0,
          right: this.tagName === 'SPAN' ? 500 : 100,
          bottom: 16,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect;
      });

    function MaskedCoreOverflowHarness() {
      const coreInputRef = useRef<HTMLInputElement>(null);
      const engine = useMaskEngine({
        mask: '99999999999999999999',
        maskChar: '_',
        unmask: true,
        alwaysShowMask: false,
      });
      const maskState = useMemo(() => engine.compute('12345678901234567890', true), [engine]);

      return (
        <MaskedCore
          coreInputRef={coreInputRef}
          maskState={maskState}
          slotMap={engine.slotMap}
          engine={engine}
          focused
          currentRaw="12345678901234567890"
          onRawChange={() => undefined}
          onUnexpectedInput={() => undefined}
          aria-label="masked core overflow"
        />
      );
    }

    render(<MaskedCoreOverflowHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    act(() => {
      fireEvent.focus(input);
    });

    expect(screen.queryByTestId('masked-input-overlay')).not.toBeInTheDocument();
    expect(input).not.toHaveClass(globalClasses.masked);

    clientWidthSpy.mockRestore();
    rectSpy.mockRestore();
  });

  it('keeps overlay for decorative mask part when alwaysShowMask overflows input width', () => {
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

    function MaskedCoreLongMaskHarness() {
      const coreInputRef = useRef<HTMLInputElement>(null);
      const engine = useMaskEngine({
        mask: '9'.repeat(25),
        maskChar: '_',
        unmask: false,
        alwaysShowMask: true,
      });
      const maskState = useMemo(() => engine.compute('', false), [engine]);

      return (
        <MaskedCore
          coreInputRef={coreInputRef}
          maskState={maskState}
          slotMap={engine.slotMap}
          engine={engine}
          focused={false}
          currentRaw=""
          onRawChange={() => undefined}
          onUnexpectedInput={() => undefined}
          aria-label="masked core long mask"
        />
      );
    }

    render(<MaskedCoreLongMaskHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    const overlay = screen.getByTestId('masked-input-overlay');

    expect(input).toHaveValue('');
    expect(input).toHaveClass(globalClasses.masked);
    expect(overlay).toHaveTextContent('_'.repeat(25));
    expect(overlay.lastChild).toHaveClass(globalClasses.colored);

    clientWidthSpy.mockRestore();
    rectSpy.mockRestore();
  });
});

describe('MaskedCore align padding', () => {
  beforeEach(() => {
    class ResizeObserverMock {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();

      constructor(_callback: ResizeObserverCallback) {
        return {
          observe: vi.fn(),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
        };
      }
    }

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    vi.spyOn(HTMLInputElement.prototype, 'getBoundingClientRect').mockReturnValue(createRect(50, 300));
    vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(150),
    } as unknown as Range);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('applies paddingLeft to input only for right align when focused', () => {
    vi.mocked(document.createRange).mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(250),
    } as unknown as Range);

    render(<MaskedCoreAlignHarness textAlign="right" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    const overlay = screen.getByTestId('masked-input-overlay');

    expect(input.style.paddingLeft).toBe('200px');
    expect(input.style.textAlign).toBe('left');
    expect(input).toHaveValue('');
    expect(overlay.style.paddingLeft).toBe('');
    expect(overlay).toHaveTextContent('______');
  });

  it('applies paddingLeft to input only for center align when focused', () => {
    render(<MaskedCoreAlignHarness textAlign="center" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    const overlay = screen.getByTestId('masked-input-overlay');

    expect(input.style.paddingLeft).toBe('100px');
    expect(input.style.textAlign).toBe('left');
    expect(overlay.style.paddingLeft).toBe('');
  });

  it('does not apply paddingLeft for left align', () => {
    render(<MaskedCoreAlignHarness textAlign="left" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input.style.paddingLeft).toBe('');
  });

  it('clears paddingLeft after blur', () => {
    vi.mocked(document.createRange).mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(250),
    } as unknown as Range);

    render(<MaskedCoreAlignHarness textAlign="right" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.style.paddingLeft).toBe('200px');

    fireEvent.blur(input);

    expect(input.style.paddingLeft).toBe('');
  });
});

describe('MaskedCore center align focus', () => {
  beforeEach(() => {
    class ResizeObserverMock {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();

      constructor(_callback: ResizeObserverCallback) {
        return {
          observe: vi.fn(),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
        };
      }
    }

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.spyOn(HTMLInputElement.prototype, 'getBoundingClientRect').mockReturnValue(createRect(50, 300));
    vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(150),
    } as unknown as Range);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function MaskedCoreCenterFocusHarness({ initialRaw = '' }: { initialRaw?: string }) {
    const coreInputRef = useRef<HTMLInputElement>(null);
    const engine = useMaskEngine({
      mask: '999999',
      maskChar: '_',
      unmask: true,
      alwaysShowMask: true,
    });
    const [raw, setRaw] = useState(initialRaw);
    const [focused, setFocused] = useState(false);
    const maskState = useMemo(() => engine.compute(raw, focused), [engine, raw, focused]);

    return (
      <MaskedCore
        coreInputRef={coreInputRef}
        maskState={maskState}
        slotMap={engine.slotMap}
        engine={engine}
        focused={focused}
        currentRaw={raw}
        onRawChange={(nextRaw) => setRaw(nextRaw)}
        onUnexpectedInput={() => undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ textAlign: 'center' }}
        aria-label="masked core center focus"
      />
    );
  }

  it('does not shift centered overlay on pointer focus', () => {
    render(<MaskedCoreCenterFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');
    const overlay = screen.getByTestId('masked-input-overlay');

    expect(overlay.style.paddingLeft).toBe('');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    fireEvent.mouseUp(input);

    expect(overlay.style.paddingLeft).toBe('');
    expect(input.style.paddingLeft).toBe('100px');

    fireEvent.blur(input);
    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    fireEvent.mouseUp(input);

    expect(overlay.style.paddingLeft).toBe('');
    expect(input.style.paddingLeft).toBe('100px');
  });

  it('places caret at start on empty center-aligned field after click focus', () => {
    render(<MaskedCoreCenterFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(0, 0);
    fireEvent.mouseUp(input);

    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);
  });

  it('keeps caret at click position on center-aligned field with value', () => {
    render(<MaskedCoreCenterFocusHarness initialRaw="12" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(1, 1);
    fireEvent.mouseUp(input);

    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(1);
  });
});

describe('MaskedCore focus caret', () => {
  beforeEach(() => {
    class ResizeObserverMock {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();

      constructor(_callback: ResizeObserverCallback) {
        return {
          observe: vi.fn(),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
        };
      }
    }

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.spyOn(HTMLInputElement.prototype, 'getBoundingClientRect').mockReturnValue(createRect(50, 300));
    vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(150),
    } as unknown as Range);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function MaskedCoreFocusHarness({
    initialRaw = '12',
    textAlign = 'right' as const,
    mask = '999999',
    alwaysShowMask = true,
  }: {
    initialRaw?: string;
    textAlign?: 'right' | 'center' | 'left';
    mask?: string;
    alwaysShowMask?: boolean;
  }) {
    const coreInputRef = useRef<HTMLInputElement>(null);
    const engine = useMaskEngine({
      mask,
      maskChar: '_',
      unmask: true,
      alwaysShowMask,
    });
    const [raw, setRaw] = useState(initialRaw);
    const [focused, setFocused] = useState(false);
    const maskState = useMemo(() => engine.compute(raw, focused), [engine, raw, focused]);

    return (
      <MaskedCore
        coreInputRef={coreInputRef}
        maskState={maskState}
        slotMap={engine.slotMap}
        engine={engine}
        focused={focused}
        currentRaw={raw}
        onRawChange={(nextRaw) => setRaw(nextRaw)}
        onUnexpectedInput={() => undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ textAlign }}
        aria-label="masked core focus"
      />
    );
  }

  it('keeps caret at click position on pointer focus when field has value', () => {
    render(<MaskedCoreFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(0, 0);
    fireEvent.mouseUp(input);

    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);
  });

  it('keeps caret at click position for right align when field has value', () => {
    render(<MaskedCoreFocusHarness textAlign="right" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(1, 1);
    fireEvent.mouseUp(input);

    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(1);
  });

  it('resets caret to input start on keyboard focus', () => {
    render(<MaskedCoreFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.focus(input, { relatedTarget: document.body });

    expect(input.selectionStart).toBe(2);
    expect(input.selectionEnd).toBe(2);
  });

  it('places caret after typed value on programmatic focus', () => {
    render(<MaskedCoreFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Браузер / jsdom часто оставляет каретку в 0 при focus() без relatedTarget.
    input.setSelectionRange(0, 0);
    fireEvent.focus(input);

    expect(input.selectionStart).toBe(2);
    expect(input.selectionEnd).toBe(2);
  });

  it('places caret after leading fixed chars on Tab focus of empty phone mask', () => {
    render(<MaskedCoreFocusHarness initialRaw="" mask="+7 999 999-99-99" alwaysShowMask={false} textAlign="left" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.focus(input, { relatedTarget: document.body });

    expect(input).toHaveValue('+7 ');
    expect(input.selectionStart).toBe(3);
    expect(input.selectionEnd).toBe(3);
  });

  it('places caret after leading fixed chars on programmatic focus of empty phone mask', () => {
    render(<MaskedCoreFocusHarness initialRaw="" mask="+7 999 999-99-99" alwaysShowMask={false} textAlign="left" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    input.setSelectionRange(0, 0);
    fireEvent.focus(input);

    expect(input).toHaveValue('+7 ');
    expect(input.selectionStart).toBe(3);
    expect(input.selectionEnd).toBe(3);
  });

  it('allows repositioning caret with mouse when input is already focused', () => {
    render(<MaskedCoreFocusHarness />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(1, 1);
    fireEvent.mouseUp(input);
    expect(input.selectionStart).toBe(1);

    input.setSelectionRange(0, 0);
    fireEvent.mouseUp(input);

    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);
  });

  it('inserts at start after pointer focus on empty field', () => {
    render(<MaskedCoreFocusHarness initialRaw="" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    input.setSelectionRange(0, 0);
    fireEvent.mouseUp(input);
    fireEvent.change(input, { target: { value: '1', selectionStart: 1, selectionEnd: 1 } });

    expect(input.value).toBe('1');
  });

  it('clears overlay selection highlight on blur', () => {
    render(<MaskedCoreFocusHarness initialRaw="1234" />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Pointer-focus: не сдвигаем каретку в конец typed (это путь programmatic focus).
    act(() => {
      fireEvent.mouseDown(input);
      fireEvent.focus(input);
    });
    input.setSelectionRange(1, 3);
    fireEvent.mouseUp(input);
    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(3);

    const overlay = screen.getByTestId('masked-input-overlay');
    const childCountWithSelection = overlay.childNodes.length;
    expect(childCountWithSelection).toBeGreaterThan(2);

    fireEvent.blur(input);

    expect(overlay.childNodes.length).toBeLessThan(childCountWithSelection);
  });
});
