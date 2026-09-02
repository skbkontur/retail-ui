import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';

import { ComboBoxRequestStatus } from '../../../internal/CustomComboBox/CustomComboBoxTypes.js';
import { ComboBoxMenuDataTids } from '../../../internal/CustomComboBox/index.js';
import { MenuDataTids } from '../../../internal/Menu/index.js';
import { MenuMessageDataTids } from '../../../internal/MenuMessage/index.js';
import { MobilePopupDataTids } from '../../../internal/MobilePopup/index.js';
import { PopupIds } from '../../../internal/Popup/index.js';
import { defaultLangCode } from '../../../lib/locale/constants.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';
import type { LocaleContextProps } from '../../../lib/locale/index.js';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme.js';
import { delay } from '../../../lib/utils.js';
import { MenuItemDataTids } from '../../MenuItem/index.js';
import { Token, TokenDataTids } from '../../Token/index.js';
import { TokenInputLocaleHelper } from '../locale/index.js';
import { TokenInput, TokenInputDataTids, TokenInputType } from '../TokenInput.js';
import type { TokenInputProps } from '../TokenInput.js';

async function getItems(query: string) {
  return Promise.resolve(['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query)));
}

describe('<TokenInput />', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should contains placeholder', () => {
    const onChange = vi.fn();
    render(<TokenInput getItems={getItems} selectedItems={[]} onValueChange={onChange} placeholder="Placeholder" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Placeholder');
  });

  it('has id attribute', () => {
    const tokenInputId = 'tokenInputId';
    const result = render(<TokenInput id={tokenInputId} getItems={getItems} selectedItems={[]} />);
    expect(result.container.querySelector(`textarea#${tokenInputId}`)).not.toBeNull();
  });

  it('should throw error without getItems prop', () => {
    render(<TokenInput />);
    expect(consoleSpy).toHaveBeenCalledWith('Warning: getItems is required for "Combined" and "WithReference" modes.');
  });

  it('should focus input', () => {
    const tokenInputRef = React.createRef<TokenInput>();

    render(<TokenInput getItems={getItems} selectedItems={[]} ref={tokenInputRef} />);
    tokenInputRef.current?.focus();

    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should blur input', () => {
    const tokenInputRef = React.createRef<TokenInput>();

    render(<TokenInput getItems={getItems} selectedItems={[]} ref={tokenInputRef} />);
    tokenInputRef.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();

    tokenInputRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('should reset input value', () => {
    const inputValue = 'eee';
    const tokenInputRef = React.createRef<TokenInput>();
    render(<TokenInput getItems={getItems} selectedItems={[]} ref={tokenInputRef} />);
    const textarea = screen.getByRole('textbox');
    act(() => {
      fireEvent.focus(textarea);
    });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
    expect(screen.getByTestId(TokenInputDataTids.tokenInputMenu)).toBeInTheDocument();
    expect(textarea).toHaveValue(inputValue);
    act(() => {
      tokenInputRef.current?.reset();
    });

    expect(screen.queryByTestId(TokenInputDataTids.tokenInputMenu)).not.toBeInTheDocument();
    expect(textarea).toHaveValue('');
  });

  describe('Locale', () => {
    const TestTokenInput = () => <TokenInput type={TokenInputType.Combined} getItems={getItems} />;

    const TokenInputWithLocaleProvider = ({ langCode = defaultLangCode, locale }: LocaleContextProps) => {
      return (
        <LocaleContext.Provider
          value={{
            langCode,
            locale,
          }}
        >
          <TestTokenInput />
        </LocaleContext.Provider>
      );
    };

    it('render without LocaleProvider', async () => {
      const props = {};
      render(<TestTokenInput {...props} />);
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;
      await userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render default locale', async () => {
      const props = {};
      render(<TokenInputWithLocaleProvider {...props} />);
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;
      await userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render correct locale when set langCode', async () => {
      const props = { langCode: LangCodes.en_GB };
      render(<TokenInputWithLocaleProvider {...props} />);
      const expectedComment = TokenInputLocaleHelper.get(LangCodes.en_GB).addButtonComment;
      await userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render custom locale', async () => {
      const customComment = 'custom comment';

      const props = { locale: { TokenInput: { addButtonComment: customComment } } };
      render(<TokenInputWithLocaleProvider {...props} />);
      await userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(customComment);
    });

    it('updates when langCode changes', async () => {
      const { rerender } = render(<TokenInputWithLocaleProvider langCode={LangCodes.en_GB} />);

      const expectedComment = TokenInputLocaleHelper.get(LangCodes.ru_RU).addButtonComment;
      await userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);
      rerender(<TokenInputWithLocaleProvider langCode={LangCodes.ru_RU} />);

      expect(screen.getByTestId('MenuItem__comment')).toHaveTextContent(expectedComment);
    });
  });

  it('should call onInputValueChange', async () => {
    const onInputValueChange = vi.fn();
    const value = 'text';
    render(<TokenInput getItems={getItems} onInputValueChange={onInputValueChange} />);
    await userEvent.type(screen.getByRole('textbox'), value);
    expect(onInputValueChange).toHaveBeenCalledWith(value);
  });

  it('should blures tokenInput when esc pressed', async () => {
    const tokenInputRef = React.createRef<TokenInput>();

    const onValueChange = vi.fn();
    render(
      <TokenInput
        ref={tokenInputRef}
        type={TokenInputType.Combined}
        getItems={getItems}
        onValueChange={onValueChange}
      />,
    );

    const element = screen.getByRole('textbox');
    act(() => {
      tokenInputRef.current?.focus();
    });
    expect(element).toHaveFocus();

    act(() => {
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape', code: 'Escape' });
    });
    expect(element).not.toHaveFocus();
  });

  it('should handle comma keydown separator', async () => {
    render(<TokenInputWithState disabledToken={''} />);
    const element = screen.getByRole('textbox');
    element.click();
    await userEvent.keyboard('aaa,bbb,ccc,');
    delay(1);
    expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
  });

  it('should render custom AddButton', async () => {
    const value = 'text';
    const getButtonText = (v?: string) => `Custom Add: ${v}`;
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        renderAddButton={(v) => <span data-tid="AddButton">{getButtonText(v)}</span>}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);

    const addButton = screen.getByTestId('AddButton');

    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent(getButtonText(value));
  });

  it('should add item by AddButton click', async () => {
    const value = 'value';
    const onValueChange = vi.fn();
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        onValueChange={onValueChange}
        renderAddButton={(v, addItem) => (
          <button key="AddButton" data-tid="AddButton" onClick={addItem}>
            {v}
          </button>
        )}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);
    await userEvent.click(screen.getByTestId('AddButton'));

    expect(onValueChange).toHaveBeenCalledWith([value]);
  });

  it('should call onValueChange when element loses focus and there is only one element in the drop-down list', async () => {
    const value = 'aaa';
    const tokenInputRef = React.createRef<TokenInput>();

    const onValueChange = vi.fn();
    render(
      <TokenInput
        ref={tokenInputRef}
        type={TokenInputType.Combined}
        getItems={getItems}
        onValueChange={onValueChange}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);
    tokenInputRef.current?.blur();

    expect(onValueChange).toHaveBeenCalledWith([value]);
  });

  it('should handle Token DoubleClick', async () => {
    render(<TokenInputWithSelectedItem />);
    const token = screen.getByTestId(TokenDataTids.root);

    expect(token).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveTextContent('xxx');

    await userEvent.dblClick(token);

    expect(token).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent('xxx');
  });

  it('should delete token if value was deleted in editing token mode', async () => {
    render(<TokenInputWithSelectedItem />);
    const input = screen.getByRole('textbox');
    await userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
    await userEvent.keyboard('[Backspace]');
    input.blur();

    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
  });

  it('should render token if the token value has not changed during editing', async () => {
    render(<TokenInputWithSelectedItem />);
    const input = screen.getByRole('textbox');
    await userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
    await delay(0);
    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
    act(() => {
      input.blur();
    });
    expect(screen.getByTestId(TokenDataTids.root)).toBeInTheDocument();
  });

  it('should delete Token with Backspace', async () => {
    render(<TokenInputWithState disabledToken={'yyy'} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.keyboard('[Backspace>2]');
    expect(screen.queryByText('zzz')).not.toBeInTheDocument();
  });

  it('should not delete disabled Token with Backspace', async () => {
    render(<TokenInputWithState disabledToken={'yyy'} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.keyboard('[Backspace>4]');
    expect(screen.getByText('yyy')).toBeInTheDocument();
  });

  it('should add new Token after navigations with arrows', async () => {
    render(<TokenInputWithState disabledToken={'zzz'} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await delay(0);
    await userEvent.keyboard('[ArrowDown>3]');
    await userEvent.keyboard('[ArrowUp>2]');
    await userEvent.keyboard('{enter}');
    expect(screen.getByText('bbb')).toBeInTheDocument();
  });

  it('should not add new Token after enter keydown with empty search withReference', async () => {
    render(<SimpleTokenInput type={TokenInputType.WithReference} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'notvalidtokenvalue');
    expect(screen.queryByText('Не найдено')).toBeInTheDocument();
    await userEvent.keyboard('{enter}');
    await delay(0);
    expect(screen.queryByText('aaa')).not.toBeInTheDocument();
  });

  it('should not handle whitespace keydown separator', async () => {
    render(<SimpleTokenInput />);
    const tokenInput = screen.getByRole('textbox');

    tokenInput.click();
    await userEvent.type(tokenInput, 'aaa bbb ccc');
    delay(1);
    const tokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
    expect(tokenCount).toBe(1);
  });

  it('should handle comma keydown separator', async () => {
    render(<SimpleTokenInput />);
    const tokenInput = screen.getByRole('textbox');

    tokenInput.click();
    await userEvent.type(tokenInput, 'aaa,bbb,ccc');
    delay(1);
    expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
  });

  it.each(extendedDelimiters)('should add token on onChange with delimiter %j', async (delimiter) => {
    await assertTokenAddedOnDelimiterChange(delimiter);
  });

  it('should handle multiple tokens from onChange with mixed extended delimiters', async () => {
    await assertMixedDelimitersOnChange();
  });

  it('should not handle default separators when custom separators', async () => {
    render(<SimpleTokenInput customDelimiters={[';']} />);
    const tokenInput = screen.getByRole('textbox');

    tokenInput.click();
    await userEvent.type(tokenInput, 'aaa,bbb ccc');
    delay(1);
    const tokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
    expect(tokenCount).toBe(1);
  });

  it('should handle custom separators', async () => {
    render(<SimpleTokenInput customDelimiters={[';']} />);
    const tokenInput = screen.getByRole('textbox');

    tokenInput.click();
    await userEvent.type(tokenInput, 'aaa;bbb;ccc');
    delay(1);
    expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
  });

  it('should handle e.preventDefault() in onKeyDown', async () => {
    const input = '112233';
    const validValue = /[13]+/;
    const expected = '1133';
    render(
      <TokenInput
        getItems={() => Promise.resolve([])}
        onKeyDown={(e) => {
          if (!validValue.test(e.key)) {
            e.preventDefault();
          }
        }}
      />,
    );
    const tokenInput = screen.getByRole('textbox');
    tokenInput.click();
    await userEvent.type(tokenInput, input);

    expect(tokenInput).toHaveValue(expected);
  });

  describe('a11y', () => {
    it('prop aria-describedby applied correctly', () => {
      render(
        <div>
          <TokenInput aria-describedby="elementId" getItems={getItems} type={TokenInputType.Combined} />
          <p id="elementId">Description</p>
        </div>,
      );
      const tokenInput = screen.getByRole('textbox');
      expect(tokenInput).toHaveAttribute('aria-describedby', 'elementId');
      expect(tokenInput).toHaveAccessibleDescription('Description');
    });

    it('should connect input and dropdown through aria-controls', async () => {
      render(<TokenInputWithSelectedItem />);

      await userEvent.click(screen.getByRole('textbox'));

      expect(screen.getByTestId(TokenInputDataTids.label)).toHaveAttribute(
        'aria-controls',
        expect.stringContaining(PopupIds.root),
      );
      expect(screen.getByTestId(TokenInputDataTids.tokenInputMenu)).toHaveAttribute(
        'id',
        expect.stringContaining(PopupIds.root),
      );
    });

    it('sets value for aria-label attribute on textarea', () => {
      const ariaLabel = 'aria-label';
      render(<TokenInput getItems={vi.fn()} aria-label={ariaLabel} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('sets aria-busy while getItems is pending', async () => {
      let resolveItems: (items: string[]) => void = () => undefined;
      const getItemsMock = vi.fn(
        () =>
          new Promise<string[]>((resolve) => {
            resolveItems = resolve;
          }),
      );
      render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-busy');

      await userEvent.click(input);

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-busy', 'true');
      });

      await act(async () => {
        resolveItems(['aaa']);
      });

      await waitFor(() => {
        expect(input).not.toHaveAttribute('aria-busy');
      });
    });
  });
  describe('in "without reference" mode', () => {
    const renderTokenInput = (props: TokenInputProps<string>) => render(<TokenInputWithState {...props} />);

    it('should add new tokens on blur', async () => {
      renderTokenInput({ type: TokenInputType.WithoutReference });

      const tokenInput = screen.getByRole('textbox');
      const startingTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      tokenInput.click();

      await userEvent.type(tokenInput, 'foo');
      await userEvent.keyboard('[Tab]');

      const actualTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      const expectedTokenCount = startingTokenCount + 1;
      expect(actualTokenCount).toBe(expectedTokenCount);
    });

    it('should not affect onUnexpectedInput behavior when it returns value', async () => {
      const expectedValue = 'expectedValue';
      renderTokenInput({ onUnexpectedInput: () => expectedValue, type: TokenInputType.WithoutReference });

      const tokenInput = screen.getByRole('textbox');
      const startingTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      tokenInput.click();

      await userEvent.type(tokenInput, 'foo');
      await userEvent.keyboard('[Tab]');

      const actualTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      const expectedTokenCount = startingTokenCount + 1;

      expect(actualTokenCount).toBe(expectedTokenCount);
      expect(screen.queryAllByTestId(TokenDataTids.root).at(-1)).toHaveTextContent(expectedValue);
    });

    it.each([
      [null, TokenInputType.WithoutReference, 3],
      [undefined, TokenInputType.WithoutReference, 4],
    ])('should not affect onUnexpectedInput behavior when it returns - %o', async (returnedValue, type, expected) => {
      renderTokenInput({ onUnexpectedInput: () => returnedValue, type });

      const tokenInput = screen.getByRole('textbox');
      tokenInput.click();

      await userEvent.type(tokenInput, 'foo');
      await userEvent.keyboard('[Tab]');

      const actualTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      expect(actualTokenCount).toBe(expected);
    });
  });

  describe('isTokenValid', () => {
    const isTokenValid = (value: string) => !value.includes(' ');

    const StatefulTokenInput = (props: Partial<TokenInputProps<string>>) => {
      const [selectedItems, setSelectedItems] = useState<string[]>([]);
      return (
        <TokenInput
          type={TokenInputType.WithoutReference}
          selectedItems={selectedItems}
          onValueChange={setSelectedItems}
          isTokenValid={isTokenValid}
          {...props}
        />
      );
    };

    it('should not add token on Enter when input is invalid', async () => {
      render(<StatefulTokenInput />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await userEvent.keyboard('{Enter}');

      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(0);
      expect(tokenInput).toHaveValue('foo bar');
    });

    it('should add token on Enter when input is valid', async () => {
      render(<StatefulTokenInput />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo');
      await userEvent.keyboard('{Enter}');

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(tokenInput).toHaveValue('');
    });

    it('should not add token on blur when input is invalid', async () => {
      const isTokenValidSpy = vi.fn(isTokenValid);
      render(<StatefulTokenInput isTokenValid={isTokenValidSpy} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await userEvent.tab();

      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(0);
      expect(tokenInput).toHaveValue('foo bar');
      expect(isTokenValidSpy).toHaveBeenCalledTimes(1);
      expect(isTokenValidSpy).toHaveBeenCalledWith('foo bar');
    });

    it('should not add invalid token returned from onUnexpectedInput on blur', async () => {
      const isTokenValidSpy = vi.fn(isTokenValid);
      render(<StatefulTokenInput isTokenValid={isTokenValidSpy} onUnexpectedInput={() => 'invalid token'} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.type(tokenInput, 'unexpected');
      await userEvent.tab();

      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(0);
      expect(tokenInput).toHaveValue('unexpected');
      expect(isTokenValidSpy).toHaveBeenCalledTimes(1);
      expect(isTokenValidSpy).toHaveBeenCalledWith('invalid token');
    });

    it('should add valid normalized token returned from onUnexpectedInput on blur', async () => {
      const isTokenValidSpy = vi.fn(isTokenValid);
      render(<StatefulTokenInput isTokenValid={isTokenValidSpy} onUnexpectedInput={() => 'normalized'} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.type(tokenInput, 'unexpected value');
      await userEvent.tab();

      expect(screen.getByText('normalized')).toBeInTheDocument();
      expect(tokenInput).toHaveValue('');
      expect(isTokenValidSpy).toHaveBeenCalledTimes(1);
      expect(isTokenValidSpy).toHaveBeenCalledWith('normalized');
    });

    it('should add valid tokens and keep invalid remainder on delimiter', async () => {
      render(<StatefulTokenInput type={TokenInputType.Combined} getItems={getItems} />);

      const tokenInput = screen.getByRole('textbox');
      fireEvent.change(tokenInput, { target: { value: 'valid,bad value,' } });
      await delay(1);

      expect(screen.getByText('valid')).toBeInTheDocument();
      expect(tokenInput).toHaveValue('bad value');
    });

    it('should keep invalid segment and trailing tokens in remainder on delimiter', async () => {
      render(<StatefulTokenInput type={TokenInputType.Combined} getItems={getItems} />);

      const tokenInput = screen.getByRole('textbox');
      fireEvent.change(tokenInput, { target: { value: 'valid,bad value,tail,' } });
      await delay(1);

      expect(screen.getByText('valid')).toBeInTheDocument();
      expect(tokenInput).toHaveValue('bad value,tail');
    });

    it('should keep invalid text on delimiter when all tokens are invalid', async () => {
      render(<StatefulTokenInput />);

      const tokenInput = screen.getByRole('textbox');
      fireEvent.change(tokenInput, { target: { value: 'foo bar,' } });
      await delay(1);

      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(0);
      expect(tokenInput).toHaveValue('foo bar');
    });

    it('should call isTokenValid before onInputValueChange on invalid delimiter', async () => {
      const calls: string[] = [];
      render(
        <StatefulTokenInput
          type={TokenInputType.Combined}
          getItems={getItems}
          isTokenValid={(value) => {
            const isValid = !value.includes(' ');
            if (!isValid) {
              calls.push('validate');
            }
            return isValid;
          }}
          onInputValueChange={() => calls.push('input')}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      fireEvent.change(tokenInput, { target: { value: 'foo bar,' } });
      await delay(1);

      expect(calls[0]).toBe('validate');
      expect(calls.indexOf('validate')).toBeLessThan(calls.indexOf('input'));
    });

    it('should call isTokenValid and blink on Enter when input is invalid', async () => {
      const isTokenValidSpy = vi.fn((value: string) => !value.includes(' '));
      const blinkSpy = vi.spyOn(TokenInput.prototype, 'blink').mockImplementation(() => undefined);

      render(<StatefulTokenInput isTokenValid={isTokenValidSpy} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await userEvent.keyboard('{Enter}');

      expect(isTokenValidSpy).toHaveBeenCalledWith('foo bar');
      expect(blinkSpy).toHaveBeenCalled();
      blinkSpy.mockRestore();
    });

    it('should not add token or blink while typing and loading menu items', async () => {
      const blinkSpy = vi.spyOn(TokenInput.prototype, 'blink').mockImplementation(() => undefined);
      render(
        <StatefulTokenInput
          type={TokenInputType.Combined}
          getItems={async () => ['Запрещённый токен', 'Обычный токен']}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await delay(100);

      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(0);
      expect(blinkSpy).not.toHaveBeenCalled();
      blinkSpy.mockRestore();
    });

    it('should disable add button and show invalid comment when input is invalid', async () => {
      render(<StatefulTokenInput type={TokenInputType.Combined} getItems={getItems} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await delay(100);

      const invalidComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonInvalidComment;
      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(invalidComment);
      expect(screen.getByTestId(MenuItemDataTids.root)).toBeDisabled();
    });

    it('should enable add button with default comment when input is valid', async () => {
      render(<StatefulTokenInput type={TokenInputType.Combined} getItems={getItems} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo');
      await delay(100);

      const comment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;
      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(comment);
      expect(screen.getByTestId(MenuItemDataTids.root)).not.toBeDisabled();
    });

    it('should not select first menu item on Enter when free text is invalid', async () => {
      const onValueChange = vi.fn();
      const isTokenValidSpy = vi.fn((value: string) => !value.includes(' '));
      render(
        <TokenInput
          type={TokenInputType.Combined}
          getItems={async () => ['Запрещённый токен', 'Обычный токен']}
          selectedItems={[]}
          onValueChange={onValueChange}
          isTokenValid={isTokenValidSpy}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'a ');
      await delay(100);
      await userEvent.keyboard('{Enter}');

      expect(onValueChange).not.toHaveBeenCalled();
      expect(isTokenValidSpy).toHaveBeenCalledWith('a ');
      expect(tokenInput).toHaveValue('a ');
    });

    it('should add token from menu even when predicate would reject the text', async () => {
      const onValueChange = vi.fn();
      const blinkSpy = vi.spyOn(TokenInput.prototype, 'blink').mockImplementation(() => undefined);
      render(
        <TokenInput
          type={TokenInputType.Combined}
          getItems={async () => ['foo bar']}
          selectedItems={[]}
          onValueChange={onValueChange}
          isTokenValid={isTokenValid}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await delay(100);
      await userEvent.keyboard('{ArrowDown}{Enter}');

      expect(onValueChange).toHaveBeenCalledWith(['foo bar']);
      expect(blinkSpy).not.toHaveBeenCalled();
      blinkSpy.mockRestore();
    });

    it('should validate pasted tokens and keep invalid remainder with trailing segments', async () => {
      const isTokenValidSpy = vi.fn(isTokenValid);
      render(<StatefulTokenInput isTokenValid={isTokenValidSpy} />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      fireEvent.paste(tokenInput, { clipboardData: { getData: () => 'valid,bad value,good' } });
      await delay(1);

      expect(isTokenValidSpy.mock.calls).toEqual([['valid'], ['bad value']]);
      expect(screen.getByText('valid')).toBeInTheDocument();
      expect(screen.queryByText('good')).not.toBeInTheDocument();
      expect(tokenInput).toHaveValue('bad value,good');
    });
    it('should call onInputValueChange with remainder after paste', async () => {
      const onInputValueChange = vi.fn();
      render(
        <StatefulTokenInput
          type={TokenInputType.Combined}
          getItems={getItems}
          onInputValueChange={onInputValueChange}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      fireEvent.paste(tokenInput, { clipboardData: { getData: () => 'valid,bad value,tail' } });
      await delay(1);

      expect(onInputValueChange).toHaveBeenCalledWith('bad value,tail');
      expect(tokenInput).toHaveValue('bad value,tail');
    });

    it('should not select first menu item on Enter after paste replaces navigated query', async () => {
      const onValueChange = vi.fn();
      render(
        <TokenInput
          type={TokenInputType.Combined}
          getItems={async () => ['Запрещённый токен', 'Обычный токен']}
          selectedItems={[]}
          onValueChange={onValueChange}
          isTokenValid={isTokenValid}
        />,
      );

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo');
      await delay(100);
      await userEvent.keyboard('{ArrowDown}');
      fireEvent.paste(tokenInput, { clipboardData: { getData: () => 'valid,bad value' } });
      await delay(100);
      await userEvent.keyboard('{Enter}');

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(['valid']);
      expect(tokenInput).toHaveValue('bad value');
    });

    it('should apply exact menu match on Enter while editing even when predicate would reject the text', async () => {
      const onValueChange = vi.fn();
      render(
        <TokenInput
          type={TokenInputType.Combined}
          getItems={async () => ['foo bar']}
          selectedItems={['foo']}
          onValueChange={onValueChange}
          isTokenValid={isTokenValid}
        />,
      );

      await userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
      const tokenInput = screen.getByRole('textbox');
      await userEvent.clear(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await delay(100);
      await userEvent.keyboard('{Enter}');

      expect(onValueChange).toHaveBeenCalledWith(['foo bar']);
    });

    it('should validate token when finishing editing', async () => {
      const isTokenValidSpy = vi.fn(isTokenValid);
      const onValueChange = vi.fn();
      render(
        <TokenInput
          type={TokenInputType.WithoutReference}
          selectedItems={['foo']}
          onValueChange={onValueChange}
          isTokenValid={isTokenValidSpy}
        />,
      );

      await userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
      const tokenInput = screen.getByRole('textbox');
      await userEvent.clear(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      expect(isTokenValidSpy).not.toHaveBeenCalled();
      await userEvent.keyboard('{Enter}');

      expect(isTokenValidSpy).toHaveBeenCalledTimes(1);
      expect(isTokenValidSpy).toHaveBeenCalledWith('foo bar');
      expect(onValueChange).not.toHaveBeenCalled();
      expect(tokenInput).toHaveValue('foo bar');
    });

    it('should behave as before when isTokenValid is not provided', async () => {
      const WithoutValidation = () => {
        const [selectedItems, setSelectedItems] = useState<string[]>([]);
        return (
          <TokenInput
            type={TokenInputType.WithoutReference}
            selectedItems={selectedItems}
            onValueChange={setSelectedItems}
          />
        );
      };

      render(<WithoutValidation />);

      const tokenInput = screen.getByRole('textbox');
      await userEvent.click(tokenInput);
      await userEvent.type(tokenInput, 'foo bar');
      await userEvent.keyboard('{Enter}');

      expect(screen.getByText('foo bar')).toBeInTheDocument();
    });
  });

  describe('itemToId', () => {
    interface TestValue {
      id: string;
      text: string;
    }
    interface TestItem {
      id: string;
      name: string;
      description: string;
    }

    const testItems: TestItem[] = [
      { id: '1', name: 'aaa', description: 'aaa description' },
      { id: '2', name: 'bbb', description: 'bbb description' },
      { id: '3', name: 'ccc', description: 'ccc description' },
    ];

    const getTestItems = async (query: string) => {
      return Promise.resolve(testItems.filter((item) => item.name.includes(query)));
    };

    it('should use itemToId to compare items and prevent duplicates', async () => {
      const onValueChange = vi.fn();
      const initialItems: TestValue[] = [{ id: '1', text: 'aaa' }];

      render(
        <TokenInput<TestItem>
          type={TokenInputType.Combined}
          getItems={getTestItems}
          selectedItems={initialItems.map((item) => ({ id: item.id, name: item.text, description: '' }))}
          onValueChange={onValueChange}
          itemToId={(item) => item.id}
          valueToString={(item) => item.name}
          valueToItem={(value) => ({ id: Date.now().toString(), name: value, description: '' })}
          renderItem={(item) => item.name}
          renderToken={(item, tokenProps) => (
            <Token key={item.id} {...tokenProps}>
              {item.name}_item
            </Token>
          )}
        />,
      );

      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      await delay(0);

      const menu = screen.getByTestId(TokenInputDataTids.tokenInputMenu);
      expect(menu).toBeInTheDocument();

      const menuItems = menu.querySelectorAll('[data-tid="MenuItem__content"]');
      const aaaInMenu = Array.from(menuItems).find((item) => item.textContent?.includes('aaa'));
      expect(aaaInMenu).toBeUndefined();

      expect(onValueChange).toHaveBeenCalledTimes(0);
    });

    it('should use itemToId to correctly identify and remove tokens', async () => {
      const TokenInputWithTestItems = () => {
        const [selectedItems, setSelectedItems] = useState<TestValue[]>([
          { id: '1', text: 'aaa' },
          { id: '2', text: 'bbb' },
          { id: '3', text: 'ccc' },
        ]);

        return (
          <TokenInput<TestItem>
            type={TokenInputType.Combined}
            getItems={getTestItems}
            selectedItems={selectedItems.map((item) => ({ id: item.id, name: item.text, description: '' }))}
            onValueChange={(items) => setSelectedItems(items.map((item) => ({ id: item.id, text: item.name })))}
            itemToId={(item) => item.id}
            valueToString={(item) => item.name}
            valueToItem={(value) => ({ id: Date.now().toString(), name: value, description: '' })}
            renderItem={(item) => item.name}
            renderToken={(item, tokenProps) => (
              <Token key={item.id} {...tokenProps}>
                {item.name}
              </Token>
            )}
          />
        );
      };

      render(<TokenInputWithTestItems />);

      let tokens = screen.getAllByTestId(TokenDataTids.root);
      expect(tokens).toHaveLength(3);

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      await delay(0);

      const menu = screen.getByTestId(TokenInputDataTids.tokenInputMenu);
      expect(menu).toBeInTheDocument();

      const menuItems = menu.querySelectorAll('[data-tid="MenuItem__content"]');
      const aaaInMenu = Array.from(menuItems).find((item) => item.textContent === 'aaa');
      expect(aaaInMenu).toBeUndefined();

      await userEvent.clear(input);

      const bbbToken = tokens.find((token) => token.textContent === 'bbb');
      expect(bbbToken).toBeInTheDocument();

      const removeIcon = bbbToken?.querySelector(`[data-tid="${TokenDataTids.removeIcon}"]`);
      if (removeIcon) {
        await userEvent.click(removeIcon);
      }

      tokens = screen.getAllByTestId(TokenDataTids.root);
      expect(tokens).toHaveLength(2);
      const tokenTexts = tokens.map((token) => token.textContent);
      expect(tokenTexts).toContain('aaa');
      expect(tokenTexts).toContain('ccc');
      expect(tokenTexts).not.toContain('bbb');
    });

    it('should use itemToId when editing token and preventing duplicate', async () => {
      const TokenInputWithTestItems = () => {
        const [selectedItems, setSelectedItems] = useState<TestValue[]>([
          { id: '1', text: 'aaa' },
          { id: '2', text: 'bbb' },
        ]);

        return (
          <TokenInput<TestItem>
            type={TokenInputType.Combined}
            getItems={getTestItems}
            selectedItems={selectedItems.map((item) => ({ id: item.id, name: item.text, description: '' }))}
            onValueChange={(items) => setSelectedItems(items.map((item) => ({ id: item.id, text: item.name })))}
            itemToId={(item) => item.id}
            valueToString={(item) => item.name}
            valueToItem={(value) => ({ id: Date.now().toString(), name: value, description: '' })}
            renderItem={(item) => item.name}
            renderToken={(item, tokenProps) => (
              <Token key={item.id} {...tokenProps}>
                {item.name}
              </Token>
            )}
          />
        );
      };

      render(<TokenInputWithTestItems />);

      let tokens = screen.getAllByTestId(TokenDataTids.root);
      expect(tokens).toHaveLength(2);

      const aaaToken = tokens.find((token) => token.textContent === 'aaa');
      expect(aaaToken).toBeInTheDocument();
      if (!aaaToken) {
        throw new Error('Token not found');
      }

      await userEvent.dblClick(aaaToken);
      await delay(0);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('aaa');

      await userEvent.clear(input);
      await userEvent.type(input, 'bbb');
      await delay(0);

      const menu = screen.getByTestId(TokenInputDataTids.tokenInputMenu);
      expect(menu).toBeInTheDocument();

      const menuItems = menu.querySelectorAll('[data-tid="MenuItem__content"]');
      const aaaInMenu = Array.from(menuItems).find((item) => item.textContent === 'aaa');
      expect(aaaInMenu).toBeUndefined();

      const allBbbElements = screen.getAllByText('bbb');
      const menuItem = allBbbElements[allBbbElements.length - 1];
      await userEvent.click(menuItem);

      tokens = screen.getAllByTestId(TokenDataTids.root);
      expect(tokens).toHaveLength(1);
      const tokenTexts = tokens.map((token) => token.textContent);
      expect(tokenTexts).toContain('bbb');
      expect(tokenTexts).not.toContain('aaa');
    });

    it('should correctly compare object type items with default itemToId', async () => {
      const TokenInputWithObjectItems = () => {
        const [selectedItems, setSelectedItems] = useState<Array<{ id: number; cap: string }>>([
          { id: 3, cap: 'Third' },
        ]);
        const getItems = (q: string) =>
          Promise.resolve(
            [
              { id: 1, cap: 'First' },
              { id: 2, cap: 'Second' },
              { id: 3, cap: 'Third' },
              { id: 4, cap: 'Fourth' },
              { id: 5, cap: 'Fifth' },
            ].filter((x) => x.cap.toLowerCase().includes(q.toLowerCase()) || x.toString() === q),
          );
        return (
          <TokenInput
            type={TokenInputType.Combined}
            getItems={getItems}
            selectedItems={selectedItems}
            onValueChange={setSelectedItems}
            valueToString={(item) => item.cap}
            valueToItem={(value) => ({ id: Date.now(), cap: value })}
            renderItem={(item) => item.cap}
            renderToken={(item, tokenProps) => (
              <Token key={item.id} {...tokenProps}>
                {item.cap}
              </Token>
            )}
          />
        );
      };

      render(<TokenInputWithObjectItems />);

      const tokens = screen.getAllByTestId(TokenDataTids.root);
      expect(tokens).toHaveLength(1);
      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      await userEvent.type(input, 'F');

      const menu = screen.getByTestId(TokenInputDataTids.tokenInputMenu);
      expect(menu).toBeInTheDocument();
      expect(menu).not.toHaveTextContent('Не найдено');
    });
  });

  it('should pass arguments to renderToken prop', async () => {
    type Arguments = Parameters<NonNullable<TokenInputProps<string>['renderToken']>>;
    const params = new Map<string, Arguments>();
    const items = ['111', '222', '333'];
    const TokenInputWithObjectItems = () => {
      return (
        <TokenInput
          selectedItems={items}
          getItems={async () => items}
          renderToken={(..._params) => {
            const [item, props] = _params;
            params.set(item, _params);
            return <Token {...props}>{item}</Token>;
          }}
        />
      );
    };

    render(<TokenInputWithObjectItems />);

    const propsStub = {
      disabled: undefined,
      isActive: false,
      size: 'small',
      onClick: function handleTokenClick() {},
      onDoubleClick: function handleTokenDoubleClick() {},
      onRemove: function handleIconClick() {},
    };

    items
      .map((item, i) => [item, propsStub, i] as Arguments)
      .forEach(([_item, _props, _index]) => {
        const [item, props = {}, index] = params.get(_item) || [];

        expect(item).toBe(_item);
        expect(Object.keys(props).sort()).toEqual(Object.keys(_props).sort());
        expect(index).toBe(_index);
      });
  });

  it('shows failed menu when getItems rejects', async () => {
    const getItemsMock = vi.fn(() => Promise.reject());
    render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });
  });

  it('retries getItems on retry button click', async () => {
    const getItemsMock = vi.fn(() => Promise.reject());
    render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    const callsBeforeRetry = getItemsMock.mock.calls.length;
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));

    await waitFor(() => {
      expect(getItemsMock.mock.calls.length).toBeGreaterThan(callsBeforeRetry);
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('retries getItems with current input value', async () => {
    const getItemsMock = vi.fn(() => Promise.reject());
    render(<TokenInput getItems={getItemsMock} selectedItems={['aaa']} onValueChange={vi.fn()} />);

    await userEvent.type(screen.getByRole('textbox'), 'foo');
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId(TokenDataTids.removeIcon));
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    getItemsMock.mockClear();
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));

    await waitFor(() => {
      expect(getItemsMock).toHaveBeenCalledWith('foo');
    });
  });

  it('retries getItems on Enter when request failed', async () => {
    const getItemsMock = vi.fn(() => Promise.reject());
    render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    const callsBeforeRetry = getItemsMock.mock.calls.length;
    await act(async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    });
    await userEvent.type(screen.getByRole('textbox'), '{enter}');

    await waitFor(() => {
      expect(getItemsMock.mock.calls.length).toBeGreaterThan(callsBeforeRetry);
    });
  });

  it('ignores getItems rejection after blur', async () => {
    const tokenInputRef = React.createRef<TokenInput>();
    let rejectGetItems: (reason?: unknown) => void = () => undefined;
    const getItemsMock = vi.fn(
      () =>
        new Promise<string[]>((_, reject) => {
          rejectGetItems = reject;
        }),
    );
    render(<TokenInput ref={tokenInputRef} getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-busy', 'true');
    });

    act(() => {
      tokenInputRef.current?.blur();
    });
    await act(async () => {
      rejectGetItems();
    });

    expect(tokenInputRef.current?.state.requestStatus).toBe(ComboBoxRequestStatus.Unknown);
    expect(screen.queryByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).not.toBeInTheDocument();
  });

  it('ignores getItems rejection after unmount', async () => {
    let rejectGetItems: (reason?: unknown) => void = () => undefined;
    const getItemsMock = vi.fn(
      () =>
        new Promise<string[]>((_, reject) => {
          rejectGetItems = reject;
        }),
    );
    const { unmount } = render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-busy', 'true');
    });

    unmount();
    await act(async () => {
      rejectGetItems();
    });

    expect(screen.queryByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).not.toBeInTheDocument();
  });

  it('shows items after retry succeeds without not-found state', async () => {
    let shouldReject = true;
    const getItemsMock = vi.fn(() => (shouldReject ? Promise.reject() : Promise.resolve(['aaa'])));
    render(<TokenInput getItems={getItemsMock} selectedItems={[]} />);

    await userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    shouldReject = false;
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));

    await waitFor(() => {
      expect(screen.getByText('aaa')).toBeInTheDocument();
    });
    expect(screen.queryByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(ComboBoxMenuDataTids.notFound)).not.toBeInTheDocument();
  });

  it('shows add button in Combined mode when getItems rejects', async () => {
    const onValueChange = vi.fn();
    const getItemsMock = vi.fn(() => Promise.reject());
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItemsMock}
        selectedItems={[]}
        onValueChange={onValueChange}
      />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'zzz');
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /Добавить.*zzz/ });
    expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);
    expect(onValueChange).toHaveBeenCalledWith(['zzz']);
  });

  it('does not call onUnexpectedInput on blur when getItems rejected', async () => {
    const onUnexpectedInput = vi.fn(() => 'zzz');
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={() => Promise.reject()}
        selectedItems={[]}
        onValueChange={vi.fn()}
        onUnexpectedInput={onUnexpectedInput}
      />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'zzz');
    await waitFor(() => {
      expect(screen.getByTestId(`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`)).toBeInTheDocument();
    });

    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onUnexpectedInput).not.toHaveBeenCalled();
    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
  });

  it('does not call onUnexpectedInput on blur while getItems is pending', async () => {
    const onUnexpectedInput = vi.fn(() => 'zzz');
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={() => new Promise(() => undefined)}
        selectedItems={[]}
        onValueChange={vi.fn()}
        onUnexpectedInput={onUnexpectedInput}
      />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'zzz');
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-busy', 'true');
    });

    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onUnexpectedInput).not.toHaveBeenCalled();
    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
  });

  it('calls onUnexpectedInput on blur after getItems resolves with no match', async () => {
    const onUnexpectedInput = vi.fn(() => 'zzz');
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={() => Promise.resolve([])}
        selectedItems={[]}
        onValueChange={vi.fn()}
        onUnexpectedInput={onUnexpectedInput}
      />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'zzz');
    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-busy');
    });

    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onUnexpectedInput).toHaveBeenCalledWith('zzz');
  });
});

describe('mobile TokenInput', () => {
  const calcMatches = (query: string) => query === LIGHT_THEME.mobileMediaQuery;
  const oldMatchMedia = window.matchMedia;
  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: calcMatches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

  const getVariousItems = async (q: string) =>
    Promise.resolve(
      ['First Element', 'Second', 'El1', 'El2', 'El3', 'Fourth Element With Long Text'].filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q,
      ),
    );

  const openMobilePopup = async () => {
    await act(async () => {
      await userEvent.click(screen.getByRole('textbox'));
      await delay(0);
    });
  };

  beforeEach(() => {
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    window.matchMedia = oldMatchMedia;
  });

  it.each([
    ['Combined', TokenInputType.Combined],
    ['WithReference', TokenInputType.WithReference],
  ] as const)('should open mobile popup on focus for %s', async (_name, type) => {
    render(
      <TokenInput type={type} getItems={getVariousItems} selectedItems={['First Element']} onValueChange={vi.fn()} />,
    );

    await openMobilePopup();

    expect(screen.getByTestId(MobilePopupDataTids.container)).toBeInTheDocument();
  });

  it.each([
    ['Combined', TokenInputType.Combined],
    ['WithReference', TokenInputType.WithReference],
  ] as const)('should show menu in mobile popup when typing for %s', async (_name, type) => {
    render(
      <TokenInput type={type} getItems={getVariousItems} selectedItems={['First Element']} onValueChange={vi.fn()} />,
    );

    await openMobilePopup();

    const popupTextarea = within(screen.getByTestId(MobilePopupDataTids.container)).getByRole('textbox');

    await act(async () => {
      await userEvent.type(popupTextarea, '1');
      await delay(0);
    });

    await waitFor(() => {
      expect(screen.getByText('El1')).toBeInTheDocument();
    });
  });

  it('should not open mobile popup for WithoutReference on focus', async () => {
    render(
      <TokenInput type={TokenInputType.WithoutReference} selectedItems={['First Element']} onValueChange={vi.fn()} />,
    );

    await openMobilePopup();

    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it.each(extendedDelimiters)('should add token on onChange with delimiter %j (mobile)', async (delimiter) => {
    await assertTokenAddedOnDelimiterChange(delimiter);
  });

  it('should handle multiple tokens from onChange with mixed extended delimiters (mobile)', async () => {
    await assertMixedDelimitersOnChange();
  });

  it('should keep mobile popup open after removing token via close icon', async () => {
    const onValueChange = vi.fn();
    render(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getVariousItems}
        selectedItems={['First Element', 'Second']}
        onValueChange={onValueChange}
        renderToken={(item, tokenProps) => (
          <Token key={item.toString()} {...tokenProps}>
            {item}
          </Token>
        )}
      />,
    );

    await openMobilePopup();

    const popup = screen.getByTestId(MobilePopupDataTids.container);

    await act(async () => {
      await userEvent.click(within(popup).getAllByTestId(TokenDataTids.removeIcon)[0]);
      await delay(0);
    });

    expect(screen.getByTestId(MobilePopupDataTids.container)).toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith(['Second']);
  });
});

function TokenInputWithState({
  disabledToken,
  customDelimiters,
  ...rest
}: { disabledToken?: string; customDelimiters?: string[] } & Partial<TokenInputProps<string>>) {
  const [selectedItems, setSelectedItems] = useState(['xxx', 'yyy', 'zzz']);
  return (
    <TokenInput
      delimiters={customDelimiters}
      type={TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps} disabled={item.toString() === disabledToken}>
          {item}
        </Token>
      )}
      {...rest}
    />
  );
}

const SimpleTokenInput = (props: {
  customDelimiters?: string[];
  type?: TokenInputType;
  initialSelectedItems?: string[];
}) => {
  const [selectedItems, setSelectedItems] = useState(props.initialSelectedItems ?? ['']);

  return (
    <TokenInput
      type={props.type ?? TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      delimiters={props.customDelimiters}
    />
  );
};

const extendedDelimiters = ['.', ',', ';', ' ', ':', '-', '+'] as const;

async function assertTokenAddedOnDelimiterChange(delimiter: string) {
  render(
    <SimpleTokenInput
      type={TokenInputType.WithoutReference}
      customDelimiters={[delimiter]}
      initialSelectedItems={[]}
    />,
  );
  const tokenInput = screen.getByRole('textbox');
  fireEvent.change(tokenInput, { target: { value: `token${delimiter}` } });
  await delay(1);
  expect(screen.getByText('token')).toBeInTheDocument();
}

async function assertMixedDelimitersOnChange() {
  render(
    <SimpleTokenInput
      type={TokenInputType.WithoutReference}
      customDelimiters={[...extendedDelimiters]}
      initialSelectedItems={[]}
    />,
  );
  const tokenInput = screen.getByRole('textbox');
  fireEvent.change(tokenInput, { target: { value: 'aaa,bbb,' } });
  await delay(1);
  expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(2);

  cleanup();
  render(
    <SimpleTokenInput
      type={TokenInputType.WithoutReference}
      customDelimiters={[...extendedDelimiters]}
      initialSelectedItems={[]}
    />,
  );
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'aaa.bbb;ccc ' } });
  await delay(1);
  expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
}

function TokenInputWithSelectedItem() {
  const [selectedItems, setSelectedItems] = useState(['xxx']);

  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  );
}
