import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ReactUIFeatureFlags } from '../../../lib/featureFlagsContext';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';
import { PopupIds } from '../../../internal/Popup';
import { defaultLangCode } from '../../../lib/locale/constants';
import type { LocaleContextProps } from '../../../lib/locale';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { delay } from '../../../lib/utils';
import { TokenInputLocaleHelper } from '../locale';
import type { TokenInputProps } from '../TokenInput';
import { TokenInput, TokenInputDataTids, TokenInputType } from '../TokenInput';
import { Token, TokenDataTids } from '../../Token';
import { MenuItemDataTids } from '../../MenuItem';

async function getItems(query: string) {
  return Promise.resolve(['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query)));
}

describe('<TokenInput />', () => {
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
    const renderNoGetItems = () => render(<TokenInput />);
    expect(renderNoGetItems).toThrow('Missed getItems for type');
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
  });
  describe('feature flags', () => {
    const renderWithFeatureFlags = (flags: ReactUIFeatureFlags, props: TokenInputProps<string>) =>
      render(
        <ReactUIFeatureFlagsContext.Provider value={flags}>
          <TokenInputWithState {...props} />
        </ReactUIFeatureFlagsContext.Provider>,
      );

    it('should add new tokens on blur in "without reference" mode', async () => {
      renderWithFeatureFlags(
        { tokenInputCreateTokenOnBlurInWithoutReferenceMode: true },
        { type: TokenInputType.WithoutReference },
      );

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
      renderWithFeatureFlags(
        { tokenInputCreateTokenOnBlurInWithoutReferenceMode: true },
        { onUnexpectedInput: () => expectedValue, type: TokenInputType.WithoutReference },
      );

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
      renderWithFeatureFlags(
        { tokenInputCreateTokenOnBlurInWithoutReferenceMode: true },
        { onUnexpectedInput: () => returnedValue, type },
      );

      const tokenInput = screen.getByRole('textbox');
      tokenInput.click();

      await userEvent.type(tokenInput, 'foo');
      await userEvent.keyboard('[Tab]');

      const actualTokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      expect(actualTokenCount).toBe(expected);
    });
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

const SimpleTokenInput = (props: { customDelimiters?: string[] }) => {
  const [selectedItems, setSelectedItems] = useState(['']);

  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      delimiters={props.customDelimiters}
    />
  );
};

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
