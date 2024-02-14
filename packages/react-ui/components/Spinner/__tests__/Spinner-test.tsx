import React from 'react';
import { render, screen } from '@testing-library/react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SpinnerLocaleHelper } from '../locale';
import { Spinner, SpinnerDataTids } from '../Spinner';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';

describe('Spinner', () => {
  it('renders default Spinner', () => {
    const renderSpinner = (props = {}) => render(<Spinner {...props} />);
    expect(renderSpinner).not.toThrow();
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

  describe('with spinnerRemoveDefaultCaption flag', () => {
    it('should not render default caption', () => {
      render(
        <ReactUIFeatureFlagsContext.Provider value={{ spinnerLoaderRemoveDefaultCaption: true }}>
          <Spinner />
        </ReactUIFeatureFlagsContext.Provider>,
      );

      const expectedText = SpinnerLocaleHelper.get(defaultLangCode).loading as string;

      expect(screen.getByTestId(SpinnerDataTids.root)).not.toHaveTextContent(expectedText);
    });
  });
});
