import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext, LocaleContextProps } from '../../../lib/locale';
import { delay } from '../../../lib/utils';
import { TokenInputLocaleHelper } from '../locale';
import { TokenInput, TokenInputType } from '../TokenInput';
import { TokenInputMenu } from '../TokenInputMenu';

async function getItems(query: string) {
  return Promise.resolve(['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query)));
}

describe('<TokenInput />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TokenInput getItems={getItems} selectedItems={[]} onValueChange={onChange} placeholder="Placeholder" />,
    );
    expect(wrapper.find('textarea').props().placeholder).toBe('Placeholder');
  });

  it('should reset input value', () => {
    const inputValue = 'eee';
    const wrapper = mount<TokenInput>(<TokenInput getItems={getItems} selectedItems={[]} />);

    wrapper.find('textarea').simulate('focus');
    wrapper.find('textarea').simulate('change', { target: { value: inputValue } });
    wrapper.update();
    expect(wrapper.find(TokenInputMenu).length).toBe(1);
    expect(wrapper.find('textarea').props().value).toBe(inputValue);

    wrapper.instance().reset();
    wrapper.update();
    expect(wrapper.find(TokenInputMenu).length).toBe(0);
    expect(wrapper.find('textarea').props().value).toBe('');
  });

  describe('Locale', () => {
    let wrapper: ReactWrapper;
    const getTextComment = (): string => wrapper.find('[data-tid="MenuItem__comment"]').text();
    const focus = async (): Promise<void> => {
      wrapper.find(TokenInput).instance().setState({ inFocus: true, inputValue: '--', loading: false });
      await delay(0);
      wrapper.update();
    };
    const contextMount = (props: LocaleContextProps = { langCode: defaultLangCode }, wrappedLocale = true) => {
      const tokeninput = <TokenInput type={TokenInputType.Combined} getItems={getItems} />;
      wrapper =
        wrappedLocale === false
          ? mount(tokeninput)
          : mount(
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

      await focus();

      expect(getTextComment()).toBe(expectedComment);
    });

    it('render default locale', async () => {
      contextMount();
      const expectedComment = TokenInputLocaleHelper.get(defaultLangCode).addButtonComment;

      await focus();

      expect(getTextComment()).toBe(expectedComment);
    });

    it('render correct locale when set langCode', async () => {
      contextMount({ langCode: LangCodes.en_GB });
      const expectedComment = TokenInputLocaleHelper.get(LangCodes.en_GB).addButtonComment;

      await focus();

      expect(getTextComment()).toBe(expectedComment);
    });

    it('render custom locale', async () => {
      const customComment = 'custom comment';
      contextMount({ locale: { TokenInput: { addButtonComment: customComment } } });

      await focus();

      expect(getTextComment()).toBe(customComment);
    });

    it('updates when langCode changes', async () => {
      contextMount({ langCode: LangCodes.en_GB });
      const expectedComment = TokenInputLocaleHelper.get(LangCodes.ru_RU).addButtonComment;

      await focus();
      wrapper.setProps({ value: { langCode: LangCodes.ru_RU } });

      expect(getTextComment()).toBe(expectedComment);
    });
  });

  it('should call onInputValueChange', () => {
    const onInputValueChange = jest.fn();
    const value = 'text';
    const wrapper = mount(<TokenInput getItems={getItems} onInputValueChange={onInputValueChange} />);
    wrapper.find('textarea').simulate('change', { target: { value } });
    expect(onInputValueChange).toHaveBeenCalledWith(value);
  });

  it('should render custom AddButton', async () => {
    const value = 'text';
    const getButtonText = (v?: string) => `Custom Add: ${v}`;
    const wrapper = mount(
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        renderAddButton={(v) => <span data-tid="AddButton">{getButtonText(v)}</span>}
      />,
    );

    wrapper.find(TokenInput).instance().setState({ inFocus: true, inputValue: value, loading: false });
    await delay(0);
    wrapper.update();

    const addButton = wrapper.find('[data-tid="AddButton"]');

    expect(addButton).toHaveLength(1);
    expect(addButton.text()).toBe(getButtonText(value));
  });

  it('should add item by AddButton click', async () => {
    const value = 'not existing item';
    const onValueChange = jest.fn();
    const wrapper = mount(
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

    wrapper.find('textarea').simulate('focus').simulate('change', { target: { value } });

    await delay(0);
    wrapper.update();

    wrapper.find('[data-tid="AddButton"]').simulate('click');

    expect(onValueChange).toHaveBeenCalledWith([value]);
  });
});
