// import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SpinnerLocaleHelper } from '../locale';
import { sizes } from '../../../internal/icons/SpinnerIcon';
import { Spinner, SpinnerDataTids } from '../Spinner';

const renderSpinner = (props = {}) => render(<Spinner {...props} />);

describe('Spinner', () => {
  describe('SVG animation', () => {
    it('renders default Spinner', () => {
      const renderSpinner = (props = {}) => render(<Spinner {...props} />);
      expect(renderSpinner).not.toThrow();
    });

    it('renders correct size of default Spinner', () => {
      renderSpinner();

      const svgElement = screen.getByTestId(SpinnerDataTids.svg);

      const width = svgElement.getAttribute('width');
      const height = svgElement.getAttribute('height');
      const size = sizes.normal.size as unknown as string;

      // eslint-disable-next-line eqeqeq
      expect(width == size).toBeTruthy();

      // eslint-disable-next-line eqeqeq
      expect(height == size).toBeTruthy();
    });

    it('should render big Spinner', () => {
      renderSpinner({ type: 'big' });
      const svgElement = screen.getByTestId(SpinnerDataTids.svg);
      const width = svgElement.getAttribute('width');
      const height = svgElement.getAttribute('height');
      const size = sizes.big.size as unknown as string;

      // eslint-disable-next-line eqeqeq
      expect(width == size).toBeTruthy();

      // eslint-disable-next-line eqeqeq
      expect(height == size).toBeTruthy();
    });
  });

  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      render(<Spinner />);
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading as string;

      expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(expectedText);
    });

    it('render default locale', () => {
      render(
        <LocaleContext.Provider value={{}}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading as string;

      expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading as string;

      expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom loading';
      render(
        <LocaleContext.Provider
          value={{
            locale: { Spinner: { loading: customText } },
          }}
        >
          <Spinner />
        </LocaleContext.Provider>,
      );
      expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(customText);
    });

    it('updates when langCode changes', () => {
      const { rerender } = render(
        <LocaleContext.Provider value={{}}>
          <Spinner />
        </LocaleContext.Provider>,
      );
      const expectedText = SpinnerLocaleHelper.get(LangCodes.en_GB).loading as string;

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Spinner />
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(expectedText);
    });
  });
});
