import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { defaultLangCode } from '../../LocaleProvider/constants';
import { LangCodes, LocaleProvider, LocaleProviderProps } from '../../LocaleProvider';
import { delay } from '../../../lib/utils';
import styles from '../../MenuItem/MenuItem.less';
import { TokenInputLocaleHelper } from '../locale';
import { TokenInput, TokenInputType } from '../TokenInput';

async function getItems(query: string) {
  return ['aaa', 'bbb', 'ccc'].filter(s => s.includes(query));
}
const generateSelector = (name: keyof typeof styles) => `.${styles[name]}`;

describe('<TokenInput />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TokenInput getItems={getItems} selectedItems={[]} onChange={onChange} placeholder="Placeholder" />,
    );
    expect(wrapper.find('input').props().placeholder).toBe('Placeholder');
  });

  describe('Locale', () => {
    let wrapper: ReactWrapper;
    const getTextComment = (): string => wrapper.find(generateSelector('comment')).text();
    const focus = async (): Promise<void> => {
      wrapper
        .find(TokenInput)
        .instance()
        .setState({ inFocus: true, inputValue: '--', loading: false });
      await delay(0);
      wrapper.update();
    };
    const contextMount = (props: LocaleProviderProps = {}, wrappedLocale = true) => {
      const tokeninput = <TokenInput type={TokenInputType.Combined} getItems={getItems} />;
      wrapper =
        wrappedLocale === false ? mount(tokeninput) : mount(<LocaleProvider {...props}>{tokeninput}</LocaleProvider>);
    };

    it('render without LocaleProvider', async () => {
      contextMount({}, false);
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
      wrapper.setProps({ langCode: LangCodes.ru_RU });

      expect(getTextComment()).toBe(expectedComment);
    });
  });
});
