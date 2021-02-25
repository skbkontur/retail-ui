import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { SpinnerLocaleHelper } from '../locale';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import { SpinnerOldCloudIcon, SPINNER_CLOUD_SIZE } from '../SpinnerOldCloudIcon';
import { SpinnerOld } from '../SpinnerOld';
import { jsStyles } from '../SpinnerOld.styles';
import { LocaleContext, LangCodes } from '../../../lib/locale';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

const render = (props = {}) => mount(<SpinnerOld {...props} />);

describe('SpinnerOld', () => {
  describe('SVG animation', () => {
    it('renders default SpinnerOld', () => {
      render();
    });

    it('renders correct size of default SpinnerOld', () => {
      const component = render();
      const cloudProps = component.find('svg').props();
      const { width, height } = cloudProps;

      expect(width).toEqual(SPINNER_CLOUD_SIZE.width);
      expect(height).toEqual(SPINNER_CLOUD_SIZE.height);
    });

    it('renders correct default SpinnerOld caption text', () => {
      const component = render();
      const captionText = component.find(`.${jsStyles.caption(DEFAULT_THEME as any)}`).text();

      expect(captionText).toEqual('Загрузка');
    });

    it('prints correct caption text', () => {
      const component = render({ caption: 'test' });
      const captionText = component.find(`.${jsStyles.caption(DEFAULT_THEME as any)}`).text();

      expect(captionText).toEqual('test');
    });

    it('should render mini SpinnerOld', () => {
      const component = render({ type: 'mini' });
      const circle = component.find(SpinnerIcon);
      const captionRight = component.find(`.${jsStyles.caption(DEFAULT_THEME as any)}`);

      expect(circle).toHaveLength(1);
      expect(captionRight).toHaveLength(1);
    });

    it('should render big SpinnerOld', () => {
      const component = render({ type: 'big' });
      const cloud = component.find(SpinnerOldCloudIcon);
      const { width, height } = cloud.find('svg').props();

      expect(cloud).toHaveLength(1);
      expect(width).toEqual(SPINNER_CLOUD_SIZE.width * 2);
      expect(height).toEqual(SPINNER_CLOUD_SIZE.height * 2);
    });
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper): string => {
      return wrapper.find(`.${jsStyles.caption(DEFAULT_THEME as any)}`).text();
    };

    it('render without LocaleProvider', () => {
      const wrapper = mount(<SpinnerOld />);
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{}}>
          <SpinnerOld />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <SpinnerOld />
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
            langCode: defaultLangCode,
            locale: { Spinner: { loading: customText } },
          }}
        >
          <SpinnerOld />
        </LocaleContext.Provider>,
      );

      expect(getTextLoading(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{}}>
          <SpinnerOld />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });
  });
});
