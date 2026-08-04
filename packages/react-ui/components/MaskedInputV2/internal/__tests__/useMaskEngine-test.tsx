import { renderHook } from '@testing-library/react';
import { expect, it } from 'vitest';

import { useMaskEngine } from '../useMaskEngine.js';

describe('useMaskEngine', () => {
  it('compute returns placeholders in displayValue when alwaysShowMask is true', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '99:99',
        maskChar: '_',
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    const state = result.current.compute('', true);

    expect(state.displayValue).toBe('__:__');
    expect(state.typedValue).toBe('');
    expect(state.outputValue).toBe('');
    expect(state.isComplete).toBe(false);
  });

  it('treats omitted IMask default tokens as literals with custom formatChars', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: 'a.vasenk**@skbkontur.ru',
        maskChar: '_',
        formatChars: {
          '9': '[0-9]',
          '*': '[a-zA-Z0-9]',
        },
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    expect(result.current.compute('', true).displayValue).toBe('a.vasenk__@skbkontur.ru');
    expect(result.current.slotMap.userSlots).toEqual([8, 9]);
  });

  it('treats omitted "*" token as a literal with custom formatChars', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: 'a*9',
        maskChar: '_',
        formatChars: { '9': '[0-9]' },
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    expect(result.current.compute('', true).displayValue).toBe('a*_');
    expect(result.current.slotMap.userSlots).toEqual([2]);
  });

  it('preserves explicitly escaped mask symbols', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '\\a*',
        maskChar: '_',
        formatChars: { '*': '[a-zA-Z0-9]' },
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    expect(result.current.compute('', true).displayValue).toBe('a_');
    expect(result.current.slotMap.userSlots).toEqual([1]);
  });

  it('keeps IMask default token editable when it is explicitly defined', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: 'aa',
        maskChar: '_',
        formatChars: { a: '[А-Я]' },
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    expect(result.current.compute('АБ', true).displayValue).toBe('АБ');
    expect(result.current.slotMap.userSlots).toEqual([0, 1]);
  });

  it('preserves token definitions from imaskProps', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: 'aa',
        maskChar: '_',
        formatChars: { '9': '[0-9]' },
        imaskProps: { definitions: { a: /[A-Z]/ } },
        unmask: false,
        alwaysShowMask: true,
      }),
    );

    expect(result.current.compute('', true).displayValue).toBe('__');
    expect(result.current.compute('AB', true).displayValue).toBe('AB');
    expect(result.current.slotMap.userSlots).toEqual([0, 1]);
  });

  it('compute returns outputValue without mask literals when unmask is true', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '99:99',
        unmask: true,
        alwaysShowMask: false,
      }),
    );

    const state = result.current.compute('1234', false);

    expect(state.outputValue).toBe('1234');
    expect(state.isComplete).toBe(true);
  });

  it('focused empty phone mask keeps outputValue empty despite eager +7', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '+7 999 999-99-99',
        unmask: false,
        alwaysShowMask: false,
      }),
    );

    const state = result.current.compute('', true);

    expect(state.typedValue).toBe('+7 ');
    expect(state.outputValue).toBe('');
  });

  it('keeps digit that matches leading fixed literal in the slot', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '7 999',
        unmask: false,
        alwaysShowMask: false,
      }),
    );

    const state = result.current.compute('7', true);

    expect(state.typedValue).toBe('7 7');
    expect(state.outputValue).toBe('7 7');
    expect(state.acceptedLength).toBe(1);
  });

  it('keeps national 7 after +7 phone prefix', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '+7 999 999-99-99',
        unmask: false,
        alwaysShowMask: false,
      }),
    );

    const state = result.current.compute('7', true);

    expect(state.typedValue).toBe('+7 7');
    expect(state.acceptedLength).toBe(1);
  });

  it('applyPaste merges pasted digits at cursor position', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '999',
        unmask: true,
        alwaysShowMask: false,
      }),
    );

    expect(result.current.applyPaste('1', 1, '23')).toEqual({ raw: '123', overflow: false });
    expect(result.current.applyPaste('', 0, '123')).toEqual({ raw: '123', overflow: false });
  });

  it('applyPaste extracts raw digits from formatted clipboard text', () => {
    const { result } = renderHook(() =>
      useMaskEngine({
        mask: '99:99',
        unmask: true,
        alwaysShowMask: false,
      }),
    );

    const accepted = result.current.applyPaste('12', 2, ':34');

    expect(accepted).toEqual({ raw: '1234', overflow: false });
  });

  it('rebuilds slotMap when mask changes', () => {
    const { result, rerender } = renderHook(
      ({ mask }: { mask: string }) =>
        useMaskEngine({
          mask,
          unmask: false,
          alwaysShowMask: true,
          maskChar: '_',
        }),
      { initialProps: { mask: '99:99' } },
    );

    const firstMap = result.current.slotMap;
    rerender({ mask: '999' });
    const secondMap = result.current.slotMap;

    expect(firstMap).not.toBe(secondMap);
    expect(secondMap.userSlots).toEqual([0, 1, 2]);
  });
});
