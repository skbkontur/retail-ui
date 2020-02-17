import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../LocaleProvider/constants';
import { LocaleProvider, LangCodes } from '../../../LocaleProvider';
import { SpinnerLocaleHelper } from '../locale';
import { SpinnerOldIcon, SPINNER_CLOUD_SIZE } from '../../icons/SpinnerOldIcon';
import { SpinnerOld } from '../SpinnerOld';
import styles from '../SpinnerOld.less';
import { SpinnerOldFallback } from '../SpinnerOldFallback';

const render = (props = {}) => mount(<SpinnerOld {...props} />);
const generateSelector = (name: keyof typeof styles) => `.${styles[name]}`;

describe('SpinnerOld', () => {
  describe('SVG animation', () => {
    beforeEach(() => {
      require('../../../../lib/utils').__setSvgAnimationSupport(true);
    });

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
      const captionText = component.find(generateSelector('captionBottom')).text();

      expect(captionText).toEqual('Загрузка');
    });

    it('prints correct caption text', () => {
      const component = render({ caption: 'test' });
      const captionText = component.find(generateSelector('captionBottom')).text();

      expect(captionText).toEqual('test');
    });

    it('should render mini SpinnerOld', () => {
      const component = render({ type: 'mini' });
      const circle = component.find(SpinnerOldIcon);
      const captionRight = component.find(generateSelector('captionRight'));

      expect(circle).toHaveLength(1);
      expect(captionRight).toHaveLength(1);
    });

    it('should render big SpinnerOld', () => {
      const component = render({ type: 'big' });
      const cloud = component.find('svg');
      const { width, height } = cloud.props();

      expect(width).toEqual(SPINNER_CLOUD_SIZE.width * 2);
      expect(height).toEqual(SPINNER_CLOUD_SIZE.height * 2);
    });
  });

  describe('Fallback animation', () => {
    beforeEach(() => {
      require('../../../../lib/utils').__setSvgAnimationSupport(false);
    });

    it('renders default SpinnerOld', () => {
      expect(render).not.toThrow();
    });

    it('renders correct size of default SpinnerOld', () => {
      const component = render();
      const cloudStyle = component
        .find(SpinnerOldFallback)
        .find('span')
        .prop('style');

      expect(cloudStyle).toMatchObject({
        width: SPINNER_CLOUD_SIZE.width,
        height: SPINNER_CLOUD_SIZE.height,
        top: 0,
      });
    });

    it('renders correct top position of mini SpinnerOld', () => {
      const type = 'mini';
      const component = render({ type });
      const cloudStyle = component
        .find(SpinnerOldFallback)
        .find('span')
        .prop('style');

      expect(cloudStyle).toMatchObject({
        width: 16,
        height: 16,
        marginBottom: -3,
        marginLeft: -1,
        marginRight: -1,
      });
    });
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper): string => {
      return wrapper.find(generateSelector('captionBottom')).text();
    };

    it('render without LocaleProvider', () => {
      const wrapper = mount(<SpinnerOld />);
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleProvider>
          <SpinnerOld />
        </LocaleProvider>,
      );
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleProvider langCode={LangCodes.en_GB}>
          <SpinnerOld />
        </LocaleProvider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom loading';
      const wrapper = mount(
        <LocaleProvider
          locale={{
            Spinner: { loading: customText },
          }}
        >
          <SpinnerOld />
        </LocaleProvider>,
      );

      expect(getTextLoading(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleProvider>
          <SpinnerOld />
        </LocaleProvider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      wrapper.setProps({ langCode: LangCodes.en_GB });

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });
  });
});
