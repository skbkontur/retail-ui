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

const SimpleTokenInput = (props: { customDelimiters?: string[]; type?: TokenInputType }) => {
  const [selectedItems, setSelectedItems] = useState(['']);

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
