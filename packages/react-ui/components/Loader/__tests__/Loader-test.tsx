import React from 'react';
import { render, screen } from '@testing-library/react';

import { Loader, LoaderDataTids } from '../Loader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_SPINNER_SHOW = 1000;
const MINIMAL_DELAY_BEFORE_SPINNER_HIDE = 1000;
const DIFFERENCE = 100;
const VeilSelector = LoaderDataTids.veil;
const SpinnerSelector = LoaderDataTids.spinner;

describe('Loader', () => {
  describe('with immutable active=false', () => {
    beforeEach(() => {
      render(
        <Loader
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
    });

    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);

      expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      expect(screen.queryByTestId(VeilSelector)).not.toBeInTheDocument();
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);

      expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      expect(screen.queryByTestId(VeilSelector)).not.toBeInTheDocument();
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE);

      expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      expect(screen.queryByTestId(VeilSelector)).not.toBeInTheDocument();
    });
  });

  describe('with mutable active=false', () => {
    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      const { rerender } = render(
        <Loader
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );

      await delay(DIFFERENCE * 3);

      rerender(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );

      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      const { rerender } = render(
        <Loader
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DIFFERENCE * 3);
      rerender(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW);

      expect(screen.getByTestId(SpinnerSelector)).toBeInTheDocument();
      expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
    });
  });

  describe('with immutable active=true', () => {
    beforeEach(() => {
      render(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
    });

    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);

      expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
      expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
      expect(screen.getByTestId(SpinnerSelector)).toBeInTheDocument();
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
      expect(screen.getByTestId(SpinnerSelector)).toBeInTheDocument();
    });
  });

  describe('with mutable active=true', () => {
    describe('change active prop before DELAY_BEFORE_SPINNER_SHOW', () => {
      it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
        const { rerender } = render(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );

        expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
        expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();

        await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);

        rerender(
          <Loader
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );

        await delay(DIFFERENCE);
        expect(screen.queryByTestId(VeilSelector)).not.toBeInTheDocument();
        expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      });
    });

    describe('change active prop after DELAY_BEFORE_SPINNER_SHOW', () => {
      it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
        const { rerender } = render(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );

        await delay(DELAY_BEFORE_SPINNER_SHOW);

        rerender(
          <Loader
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );

        await delay(DIFFERENCE);
        expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
        expect(screen.getByTestId(SpinnerSelector)).toBeInTheDocument();
      });

      it('should show spinner DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        const { rerender } = render(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        rerender(
          <Loader
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE - DIFFERENCE);

        expect(screen.getByTestId(VeilSelector)).toBeInTheDocument();
        expect(screen.getByTestId(SpinnerSelector)).toBeInTheDocument();
      });

      it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        const { rerender } = render(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );

        await delay(DELAY_BEFORE_SPINNER_SHOW);

        rerender(
          <Loader
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
        expect(screen.queryByTestId(VeilSelector)).not.toBeInTheDocument();
        expect(screen.queryByTestId(SpinnerSelector)).not.toBeInTheDocument();
      });
    });
  });
});
