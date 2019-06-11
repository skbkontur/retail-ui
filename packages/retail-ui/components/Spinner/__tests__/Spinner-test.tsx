import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { defaultLangCode } from '../../LocaleProvider/constants';
import LocaleProvider, { LangCodes } from '../../LocaleProvider';
import { SpinnerLocaleHelper } from '../locale';
import { sizeMaps } from '../settings';

import Spinner, { SpinnerConfig } from '../Spinner';
import styles from '../Spinner.less';
import SpinnerFallback from '../SpinnerFallback';

const render = (props = {}) => mount(<Spinner {...props} />);
const generateSelector = (name: keyof typeof styles) => `.${styles[name]}`;

describe('Spinner', () => {
  describe('SVG animation', () => {
    beforeEach(() => {
      SpinnerConfig.hasSvgAnimationSupport = true;
    });

    it('renders default Spinner', () => {
      render();
    });

    it('renders correct size of default Spinner', () => {
      const component = render();
      const cloudProps = component.find(generateSelector('cloud')).props();
      const { width, height } = cloudProps;
      const defaultType = Spinner.defaultProps.type;

      expect(width).toEqual(sizeMaps[defaultType].width);
      expect(height).toEqual(sizeMaps[defaultType].height);
    });

    it('renders correct default Spinner caption text', () => {
      const component = render();
      const captionText = component.find(generateSelector('captionBottom')).text();

      expect(captionText).toEqual('Загрузка');
    });

    it('prints correct caption text', () => {
      const component = render({ caption: 'test' });
      const captionText = component.find(generateSelector('captionBottom')).text();

      expect(captionText).toEqual('test');
    });

    it('should render mini Spinner', () => {
      const component = render({ type: 'mini' });
      const circle = component.find(generateSelector('circle'));
      const captionRight = component.find(generateSelector('captionRight'));

      expect(circle).toHaveLength(1);
      expect(captionRight).toHaveLength(1);
    });

    it('should render big Spinner', () => {
      const component = render({ type: 'big' });
      const cloud = component.find(generateSelector('cloud'));
      const { width, height } = cloud.props();

      expect(width).toEqual(sizeMaps.big.width);
      expect(height).toEqual(sizeMaps.big.height);
    });
  });

  describe('Fallback animation', () => {
    beforeEach(() => {
      SpinnerConfig.hasSvgAnimationSupport = false;
    });

    it('renders default Spinner', () => {
      expect(render).not.toThrow();
    });

    it('renders correct size of default Spinner', () => {
      const component = render();
      const cloudStyle = component
        .find(SpinnerFallback)
        .find('span')
        .prop('style');

      const type = Spinner.defaultProps.type;
      expect(cloudStyle).toMatchObject({
        width: sizeMaps[type].width,
        height: sizeMaps[type].height,
        top: 0,
      });
    });

    it('renders correct top position of mini Spinner', () => {
      const type = 'mini';
      const component = render({ type });
      const cloudStyle = component
        .find(SpinnerFallback)
        .find('span')
        .prop('style');

      expect(cloudStyle).toMatchObject({
        width: sizeMaps[type].width,
        height: sizeMaps[type].height,
        top: 2,
      });
    });
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper): string => {
      return wrapper.find(generateSelector('captionBottom')).text();
    };

    it('render without LocaleProvider', () => {
      const wrapper = mount(<Spinner />);
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleProvider>
          <Spinner />
        </LocaleProvider>,
      );
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading;

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleProvider langCode={LangCodes.en_GB}>
          <Spinner />
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
          <Spinner />
        </LocaleProvider>,
      );

      expect(getTextLoading(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleProvider>
          <Spinner />
        </LocaleProvider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading;

      wrapper.setProps({ langCode: LangCodes.en_GB });

      expect(getTextLoading(wrapper)).toBe(expectedText);
    });
  });
});
