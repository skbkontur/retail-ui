import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Loader, LoaderProps, LoaderState } from '../Loader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_SPINNER_SHOW = 1000;
const MINIMAL_DELAY_BEFORE_SPINNER_HIDE = 1000;
const DIFFERENCE = 100;

describe('Loader', () => {
  let loader: ReactWrapper<LoaderProps, LoaderState, Loader>;

  describe('with immutable active=false', () => {
    beforeEach(() => {
      loader = mount<Loader>(
        <Loader
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
    });

    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
    });
  });

  describe('with mutable active=false', () => {
    beforeEach(() => {
      loader = mount<Loader>(
        <Loader
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
    });

    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DIFFERENCE * 3);
      loader.setProps({ active: true });
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DIFFERENCE * 3);
      loader.setProps({ active: true });
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
    });
  });

  describe('with immutable active=true', () => {
    beforeEach(() => {
      loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
    });

    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
    });
  });

  describe('with mutable active=true', () => {
    describe('change active prop before DELAY_BEFORE_SPINNER_SHOW', () => {
      beforeEach(() => {
        loader = mount<Loader>(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );
      });

      it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
        loader.setProps({ active: false });
        await delay(DIFFERENCE);
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      });

      it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
        loader.setProps({ active: false });
        await delay(DIFFERENCE);
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      });
    });

    describe('change active prop after DELAY_BEFORE_SPINNER_SHOW', () => {
      beforeEach(() => {
        loader = mount<Loader>(
          <Loader
            active
            delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
            minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
          />,
        );
      });

      it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(DIFFERENCE);
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
      });

      it('should show spinner DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE - DIFFERENCE);
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
      });

      it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      });
    });
  });
});
