import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../LocaleProvider/constants';
import { LangCodes, LocaleProvider } from '../../LocaleProvider';
import { SpinnerLocaleHelper } from '../locale';
import { sizes } from '../../internal/icons/SpinnerIcon';
import { Spinner } from '../Spinner';
import { SpinnerFallback } from '../SpinnerFallback';

const render = (props = {}) => mount(<Spinner {...props} />);

describe('Spinner', () => {
  describe('SVG animation', () => {
    beforeEach(() => {
      require('../../../lib/utils').__setSvgAnimationSupport(true);
    });

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

  describe('Fallback animation', () => {
    beforeEach(() => {
      require('../../../lib/utils').__setSvgAnimationSupport(false);
    });

    it('renders default Spinner', () => {
      expect(render).not.toThrow();
    });

    it('renders correct size of default Spinner', () => {
      const component = render();
      const spinnerStyle = component
        .find(SpinnerFallback)
        .find('span')
        .prop('style');

      expect(spinnerStyle).toMatchObject({
        width: sizes.normal.size,
        height: sizes.normal.size,
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
        width: sizes.mini.size,
        height: sizes.mini.size,
        marginBottom: -3,
        marginLeft: -1,
        marginRight: -1,
      });
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
