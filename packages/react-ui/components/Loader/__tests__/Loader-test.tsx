import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Loader, LoaderProps, LoaderState } from '../Loader';
import { delay } from '../../../lib/utils';
import { styles } from '../Loader.styles';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

const DELAY_BEFORE_SPINNER_SHOW = 1000;
const MINIMAL_DELAY_BEFORE_SPINNER_HIDE = 1000;
const DIFFERENCE = 100;
const VeilSelector = `ZIndex.${styles.active(DEFAULT_THEME)}`;
const SpinnerSelector = `.${styles.spinnerContainer()}`;

const expectComponentLengthInWrapper = (
  wrapper: ReactWrapper<LoaderProps, LoaderState, Loader>,
  component: string,
  length: number,
) => expect(wrapper.find(component)).toHaveLength(length);

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
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      expectComponentLengthInWrapper(loader, VeilSelector, 0);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      expectComponentLengthInWrapper(loader, VeilSelector, 0);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      expectComponentLengthInWrapper(loader, VeilSelector, 0);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
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
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      expectComponentLengthInWrapper(loader, VeilSelector, 1);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DIFFERENCE * 3);
      loader.setProps({ active: true });
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
      expectComponentLengthInWrapper(loader, VeilSelector, 1);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 1);
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
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
      expectComponentLengthInWrapper(loader, VeilSelector, 1);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
      expectComponentLengthInWrapper(loader, VeilSelector, 1);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 1);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      loader.update();
      expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
      expectComponentLengthInWrapper(loader, VeilSelector, 1);
      expectComponentLengthInWrapper(loader, SpinnerSelector, 1);
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
        expectComponentLengthInWrapper(loader, VeilSelector, 1);
        expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
        await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
        loader.setProps({ active: false });
        await delay(DIFFERENCE);
        loader.update();
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
        expectComponentLengthInWrapper(loader, VeilSelector, 0);
        expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
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
        loader.update();
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
        expectComponentLengthInWrapper(loader, VeilSelector, 1);
        expectComponentLengthInWrapper(loader, SpinnerSelector, 1);
      });

      it('should show spinner DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE - DIFFERENCE);
        loader.update();
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: true });
        expectComponentLengthInWrapper(loader, VeilSelector, 1);
        expectComponentLengthInWrapper(loader, SpinnerSelector, 1);
      });

      it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
        loader.update();
        expect(loader.instance().state).toMatchObject({ isSpinnerVisible: false });
        expectComponentLengthInWrapper(loader, VeilSelector, 0);
        expectComponentLengthInWrapper(loader, SpinnerSelector, 0);
      });
    });
  });
});
