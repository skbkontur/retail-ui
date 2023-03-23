import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext, LocaleContextProps } from '../../../lib/locale';
import { delay } from '../../../lib/utils';
import { TokenInputLocaleHelper } from '../locale';
import { TokenInput, TokenInputDataTids, TokenInputType } from '../TokenInput';
import { Token } from '../../Token';
import { MenuItemDataTids } from '../../MenuItem';

async function getItems(query: string) {
  return Promise.resolve(['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query)));
}

describe('<TokenInput />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    render(<TokenInput getItems={getItems} selectedItems={[]} onValueChange={onChange} placeholder="Placeholder" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Placeholder');
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
    const contextMount = (props: LocaleContextProps = { langCode: defaultLangCode }, wrappedLocale = true) => {
      const tokeninput = <TokenInput type={TokenInputType.Combined} getItems={getItems} />;
      return wrappedLocale === false
        ? render(tokeninput)
        : render(
            <LocaleContext.Provider
              value={{
                langCode: props.langCode ?? defaultLangCode,
                locale: props.locale,
              }}
            >
              {tokeninput}
            </LocaleContext.Provider>,
          );
    };

    it('render without LocaleProvider', async () => {
      contextMount({ langCode: defaultLangCode }, false);
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;

      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render default locale', async () => {
      contextMount();
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;

      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render correct locale when set langCode', async () => {
      contextMount({ langCode: LangCodes.en_GB });
      const expectedComment = TokenInputLocaleHelper.get(LangCodes.en_GB).addButtonComment;

      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(expectedComment);
    });

    it('render custom locale', async () => {
      const customComment = 'custom comment';
      contextMount({ locale: { TokenInput: { addButtonComment: customComment } } });

      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      expect(screen.getByTestId(MenuItemDataTids.comment)).toHaveTextContent(customComment);
    });

    it('updates when langCode changes', async () => {
      const Comp = (props: LocaleContextProps = { langCode: defaultLangCode }) => {
        return (
          <>
            render(
            <LocaleContext.Provider
              value={{
                langCode: props.langCode ?? defaultLangCode,
                locale: props.locale,
              }}
            >
              <TokenInput type={TokenInputType.Combined} getItems={getItems} />
            </LocaleContext.Provider>
            , );
          </>
        );
      };

      const { rerender } = render(<Comp langCode={LangCodes.en_GB} />);

      const expectedComment = TokenInputLocaleHelper.get(LangCodes.ru_RU).addButtonComment;

      userEvent.type(screen.getByRole('textbox'), '--');
      await delay(0);

      rerender(<Comp langCode={LangCodes.ru_RU} />);

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
    await userEvent.keyboard('[ArrowLeft>3]');
    await userEvent.keyboard('[ArrowRight>4]');
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('aaa')).toBeInTheDocument();
  });

  it('props aria-describedby applied correctly', () => {
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
