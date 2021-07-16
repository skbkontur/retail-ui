import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SpinnerLocaleHelper } from '../locale';
import { sizes } from '../../../internal/icons/SpinnerIcon';
import { Spinner } from '../Spinner';

const render = (props = {}) => mount(<Spinner {...props} />);

describe('Spinner', () => {
  describe('SVG animation', () => {
    it('renders default Spinner', () => {
      render();
    });

    it('renders correct size of default Spinner', () => {
      const component = render();
      const cloudProps = component.find('svg').props();
      const { width, height } = cloudProps;

      expect(width).toEqual(sizes.normal.size);
      expect(height).toEqual(sizes.normal.size);
    });

    it('should render big Spinner', () => {
      const component = render({ type: 'big' });
      const cloud = component.find('svg');
      const { width, height } = cloud.props();

      expect(width).toEqual(sizes.big.size);
      expect(height).toEqual(sizes.big.size);
    });
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper): string => {
      return wrapper.text();
    };

    it('render without LocaleProvider', () => {
      const wrapper = mount(<Spinner />);
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{}}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom loading';
      const wrapper = mount(
        <LocaleContext.Provider
          value={{
            locale: { Spinner: { loading: customText } },
          }}
        >
          <Spinner />
        </LocaleContext.Provider>,
      );

      expect(getTextLoading(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{}}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });
  });
});
