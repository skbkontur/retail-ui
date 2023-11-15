import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopupIds } from '../../../internal/Popup';
import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext, LocaleContextProps } from '../../../lib/locale';
import { delay } from '../../../lib/utils';
import { TokenInputLocaleHelper } from '../locale';
import { TokenInput, TokenInputDataTids, TokenInputType } from '../TokenInput';
import { Token, TokenDataTids } from '../../Token';
import { MenuItemDataTids } from '../../MenuItem';
import { FeatureFlagsContext } from '../../../lib/featureFlagsContext';

async function getItems(query: string) {
  return Promise.resolve(['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query)));
}

describe('<TokenInput />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    render(<TokenInput getItems={getItems} selectedItems={[]} onValueChange={onChange} placeholder="Placeholder" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Placeholder');
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
    fireEvent.focus(textarea);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });

    expect(screen.getByTestId(TokenInputDataTids.tokenInputMenu)).toBeInTheDocument();
    expect(textarea).toHaveValue(inputValue);

    tokenInputRef.current?.reset();

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
      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render default locale', async () => {
      const props = {};
      render(<TokenInputWithLocaleProvider {...props} />);
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;
      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render correct locale when set langCode', async () => {
      const props = { langCode: LangCodes.en_GB };
      render(<TokenInputWithLocaleProvider {...props} />);
      const expectedComment = TokenInputLocaleHelper.get(LangCodes.en_GB).addButtonComment;
      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render custom locale', async () => {
      const customComment = 'custom comment';

      const props = { locale: { TokenInput: { addButtonComment: customComment } } };
      render(<TokenInputWithLocaleProvider {...props} />);
      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(customComment);
    });

    it('updates when langCode changes', async () => {
      const { rerender } = render(<TokenInputWithLocaleProvider langCode={LangCodes.en_GB} />);

      const expectedComment = TokenInputLocaleHelper.get(LangCodes.ru_RU).addButtonComment;
      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);
      rerender(<TokenInputWithLocaleProvider langCode={LangCodes.ru_RU} />);

      expect(screen.getByTestId('MenuItem__comment')).toHaveTextContent(expectedComment);
    });
  });

  it('should call onInputValueChange', () => {
    const onInputValueChange = jest.fn();
    const value = 'text';
    render(<TokenInput getItems={getItems} onInputValueChange={onInputValueChange} />);
    userEvent.type(screen.getByRole('textbox'), value);
    expect(onInputValueChange).toHaveBeenCalledWith(value);
  });

  it('should blures tokenInput when esc pressed', () => {
    const tokenInputRef = React.createRef<TokenInput>();

    const onValueChange = jest.fn();
    render(
      <TokenInput
        ref={tokenInputRef}
        type={TokenInputType.Combined}
        getItems={getItems}
        onValueChange={onValueChange}
      />,
    );

    const element = screen.getByRole('textbox');
    tokenInputRef.current?.focus();
    expect(element).toHaveFocus();

    userEvent.keyboard('{esc}');
    expect(element).not.toHaveFocus();
  });

  it('should handle comma keydown separator', () => {
    render(<TokenInputWithState disabledToken={''} />);
    const element = screen.getByRole('textbox');
    element.click();
    userEvent.keyboard('aaa,bbb,ccc,');
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
    userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);

    const addButton = screen.getByTestId('AddButton');

    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent(getButtonText(value));
  });

  it('should add item by AddButton click', async () => {
    const value = 'value';
    const onValueChange = jest.fn();
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
    userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);
    userEvent.click(screen.getByTestId('AddButton'));

    expect(onValueChange).toHaveBeenCalledWith([value]);
  });

  it('should call onValueChange when element loses focus and there is only one element in the drop-down list', async () => {
    const value = 'aaa';
    const tokenInputRef = React.createRef<TokenInput>();

    const onValueChange = jest.fn();
    render(
      <TokenInput
        ref={tokenInputRef}
        type={TokenInputType.Combined}
        getItems={getItems}
        onValueChange={onValueChange}
      />,
    );
    userEvent.type(screen.getByRole('textbox'), value);
    await delay(0);
    tokenInputRef.current?.blur();

    expect(onValueChange).toHaveBeenCalledWith([value]);
  });

  it('should handle Token DoubleClick', async () => {
    render(<TokenInputWithSelectedItem />);
    const token = screen.getByTestId(TokenDataTids.root);

    expect(token).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveTextContent('xxx');

    userEvent.dblClick(token);

    expect(token).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent('xxx');
  });

  it('should delete token if value was deleted in editing token mode', async () => {
    render(<TokenInputWithSelectedItem />);
    const input = screen.getByRole('textbox');
    userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
    await userEvent.keyboard('[Backspace]');
    input.blur();

    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
  });

  it('should render token if the token value has not changed during editing', async () => {
    render(<TokenInputWithSelectedItem />);
    const input = screen.getByRole('textbox');
    userEvent.dblClick(screen.getByTestId(TokenDataTids.root));
    await delay(0);
    expect(screen.queryByTestId(TokenDataTids.root)).not.toBeInTheDocument();
    input.blur();

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

  describe('with TokenInputRemoveWhitespaceFromDefaultDelimiters flag', () => {
    it('should not handle whitespace keydown separator', async () => {
      render(<TokenInputWithFeatureFlagsContext />);
      const tokenInput = screen.getByRole('textbox');

      tokenInput.click();
      userEvent.type(tokenInput, 'aaa bbb ccc');
      delay(1);
      const tokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      expect(tokenCount).toBe(1);
    });

    it('should handle comma keydown separator', async () => {
      render(<TokenInputWithFeatureFlagsContext />);
      const tokenInput = screen.getByRole('textbox');

      tokenInput.click();
      userEvent.type(tokenInput, 'aaa,bbb,ccc');
      delay(1);
      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
    });

    it('should not handle default separators when custom separators', async () => {
      render(<TokenInputWithFeatureFlagsContext customDelimiters={[';']} />);
      const tokenInput = screen.getByRole('textbox');

      tokenInput.click();
      userEvent.type(tokenInput, 'aaa,bbb ccc');
      delay(1);
      const tokenCount = screen.queryAllByTestId(TokenDataTids.root).length;
      expect(tokenCount).toBe(1);
    });

    it('should handle custom separators', async () => {
      render(<TokenInputWithFeatureFlagsContext customDelimiters={[';']} />);
      const tokenInput = screen.getByRole('textbox');

      tokenInput.click();
      userEvent.type(tokenInput, 'aaa;bbb;ccc');
      delay(1);
      expect(screen.queryAllByTestId(TokenDataTids.root)).toHaveLength(3);
    });
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

    it('should connect input and dropdown through aria-controls', () => {
      render(<TokenInputWithSelectedItem />);

      userEvent.click(screen.getByRole('textbox'));

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
      render(<TokenInput getItems={jest.fn()} aria-label={ariaLabel} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});

function TokenInputWithState(props: { disabledToken: string }) {
  const [selectedItems, setSelectedItems] = useState(['xxx', 'yyy', 'zzz']);
  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      selectedItems={selectedItems}
      onValueChange={setSelectedItems}
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps} disabled={item.toString() === props.disabledToken}>
          {item}
        </Token>
      )}
    />
  );
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

function TokenInputWithFeatureFlagsContext(props: { customDelimiters?: string[] }) {
  const [selectedItems, setSelectedItems] = useState(['']);

  return (
    <FeatureFlagsContext.Provider value={{ TokenInputRemoveWhitespaceFromDefaultDelimiters: true }}>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        selectedItems={selectedItems}
        onValueChange={setSelectedItems}
        {...(props.customDelimiters ? { delimiters: props.customDelimiters } : {})}
        renderToken={(item, tokenProps) => (
          <Token key={item.toString()} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </FeatureFlagsContext.Provider>
  );
}
