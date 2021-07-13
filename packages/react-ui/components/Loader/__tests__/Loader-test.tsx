import React from 'react';
import { mount } from 'enzyme';

import { Loader } from '../Loader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_SPINNER_SHOW = 500;
const MINIMAL_DELAY_BEFORE_SPINNER_HIDE = 500;
const DIFFERENCE = 100;

describe('Loader', () => {
  describe('with immutable active prop', () => {
    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: false,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: false,
      });
    });

    it('should show spinner after DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: true,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: true,
      });
    });

    it('should change needShowSpinnerMinimalTime in state after DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW + MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: true,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: false,
      });
    });
  });

  describe('with mutable active prop', () => {
    it('should not show spinner before DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: false,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: false,
      });
    });

    it('should not show spinner after change active prop before DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW - DIFFERENCE);
      loader.setProps({ active: false });
      await delay(DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: false,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: false,
      });
    });

    it('should show spinner after change active prop after DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      loader.setProps({ active: false });
      await delay(DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: true,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: true,
      });
    });

    it('should show spinner MINIMAL_DELAY_BEFORE_SPINNER_HIDE after change active prop after DELAY_BEFORE_SPINNER_SHOW', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      loader.setProps({ active: false });
      await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE - DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: true,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: true,
      });
    });

    it('should hide spinner after change active prop after DELAY_BEFORE_SPINNER_SHOW after MINIMAL_DELAY_BEFORE_SPINNER_HIDE', async () => {
      const loader = mount<Loader>(
        <Loader
          active
          delayBeforeSpinnerShow={DELAY_BEFORE_SPINNER_SHOW}
          minimalDelayBeforeSpinnerHide={MINIMAL_DELAY_BEFORE_SPINNER_HIDE}
        />,
      );
      await delay(DELAY_BEFORE_SPINNER_SHOW);
      loader.setProps({ active: false });
      await delay(MINIMAL_DELAY_BEFORE_SPINNER_HIDE + DIFFERENCE);
      expect(loader.instance().state).toMatchObject({
        isSpinnerVisible: false,
        isStickySpinner: false,
        needShowSpinnerMinimalTime: false,
      });
    });
  });
});
