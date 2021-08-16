import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Loader, LoaderProps, LoaderState } from '../Loader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_SPINNER_SHOW = 1000;
const MINIMAL_DELAY_BEFORE_SPINNER_HIDE = 1000;
const DIFFERENCE = 100;
const VeilSelector = `[data-tid='Loader__Veil']`;
const SpinnerSelector = `[data-tid='Loader__Spinner']`;

const expectComponentLengthInWrapper = (
  component: string,
  wrapper: ReactWrapper<LoaderProps, LoaderState, Loader>,
  length: number,
) => expect(wrapper.find(component)).toHaveLength(length);

const expectComponentExistInWrapper = (component: string, wrapper: ReactWrapper<LoaderProps, LoaderState, Loader>) =>
  expectComponentLengthInWrapper(component, wrapper, 1);

const expectComponentNotExistInWrapper = (component: string, wrapper: ReactWrapper<LoaderProps, LoaderState, Loader>) =>
  expectComponentLengthInWrapper(component, wrapper, 0);

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
      expectComponentNotExistInWrapper(VeilSelector, loader);
      expectComponentNotExistInWrapper(SpinnerSelector, loader);
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      loader.update();
      expectComponentNotExistInWrapper(VeilSelector, loader);
      expectComponentNotExistInWrapper(SpinnerSelector, loader);
    });

    it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
      loader.update();
      expectComponentNotExistInWrapper(VeilSelector, loader);
      expectComponentNotExistInWrapper(SpinnerSelector, loader);
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
      expectComponentExistInWrapper(VeilSelector, loader);
      expectComponentNotExistInWrapper(SpinnerSelector, loader);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DIFFERENCE * 3);
      loader.setProps({ active: true });
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      loader.update();
      expectComponentExistInWrapper(VeilSelector, loader);
      expectComponentExistInWrapper(SpinnerSelector, loader);
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
      expectComponentExistInWrapper(VeilSelector, loader);
      expectComponentNotExistInWrapper(SpinnerSelector, loader);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      loader.update();
      expectComponentExistInWrapper(VeilSelector, loader);
      expectComponentExistInWrapper(SpinnerSelector, loader);
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      loader.update();
      expectComponentExistInWrapper(VeilSelector, loader);
      expectComponentExistInWrapper(SpinnerSelector, loader);
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
        expectComponentExistInWrapper(VeilSelector, loader);
        expectComponentNotExistInWrapper(SpinnerSelector, loader);
        await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
        loader.setProps({ active: false });
        await delay(DIFFERENCE);
        loader.update();
        expectComponentNotExistInWrapper(VeilSelector, loader);
        expectComponentNotExistInWrapper(SpinnerSelector, loader);
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
        expectComponentExistInWrapper(VeilSelector, loader);
        expectComponentExistInWrapper(SpinnerSelector, loader);
      });

      it('should show spinner DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE - DIFFERENCE);
        loader.update();
        expectComponentExistInWrapper(VeilSelector, loader);
        expectComponentExistInWrapper(SpinnerSelector, loader);
      });

      it('should not show spinner after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
        await delay(DELAY_BEFORE_SPINNER_SHOW);
        loader.setProps({ active: false });
        await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE);
        loader.update();
        expectComponentNotExistInWrapper(VeilSelector, loader);
        expectComponentNotExistInWrapper(SpinnerSelector, loader);
      });
    });
  });
});
