import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { GlobalLoader, GlobalLoaderProps, GlobalLoaderState } from '../GlobalLoader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_GLOBAL_LOADER_SHOW = 1000;
const DELAY_BEFORE_GLOBAL_LOADER_HIDE = 1000;
const DIFFERENCE = 100;

async function setSuccessAndStart(globalLoader: ReactWrapper<GlobalLoaderProps, GlobalLoaderState, GlobalLoader>) {
  globalLoader.setProps({ active: true });
  globalLoader.update();
  await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
  globalLoader.setProps({ active: false });
  globalLoader.update();
  globalLoader.setProps({ active: true });
  globalLoader.update();
}

describe('Global Loader', () => {
  let globalLoader: ReactWrapper<GlobalLoaderProps, GlobalLoaderState, GlobalLoader>;
  let active = false;

  describe('with props', () => {
    beforeEach(() => {
      globalLoader = mount<GlobalLoader>(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
        />,
      );
    });

    it('should be the only one', async () => {
      const globalLoader2: ReactWrapper<GlobalLoaderProps, GlobalLoaderState, GlobalLoader> = mount<GlobalLoader>(
        <GlobalLoader expectedResponseTime={2000} />,
      );

      expect(globalLoader.state().dead).toBe(true);
      expect(globalLoader2.state().dead).toBe(false);
    });

    it('should not show before DELAY_BEFORE_GLOBAL_LOADER_SHOW', async () => {
      active = true;
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW - DIFFERENCE);
      expect(globalLoader.state().visible).toBe(false);
    });

    it('should set active', async () => {
      await delay(DIFFERENCE);
      expect(globalLoader.state().visible).toBe(true);
    });

    it('should set error', async () => {
      globalLoader.setProps({ rejected: true });
      globalLoader.update();
      expect(globalLoader.state().rejected).toBe(true);
    });

    it('should set success', async () => {
      globalLoader.setProps({ active: false });
      globalLoader.update();
      expect(globalLoader.state().done).toBe(true);
    });

    // FIXME: у enzyme проблемы с тестированием lodash.debounce

    // it('should not start during success animation', async () => {
    //   await setSuccessAndStart(globalLoader);
    //   expect(globalLoader.state().done).toBe(true);
    // });

    it('should start after success animation', async () => {
      await setSuccessAndStart(globalLoader);
      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);
      expect(globalLoader.state().done).toBe(false);
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(globalLoader.state().visible).toBe(true);
    });
  });

  describe('with static methods', () => {
    beforeEach(() => {
      globalLoader = mount<GlobalLoader>(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        />,
      );
    });

    // it('should not show before DELAY_BEFORE_GLOBAL_LOADER_SHOW', async () => {
    //   GlobalLoader.start();
    //   await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW - DIFFERENCE);
    //   expect(globalLoader.state().visible).toBe(false);
    // });

    it('should set active', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(globalLoader.state().visible).toBe(true);
    });

    it('should set error', async () => {
      GlobalLoader.reject();
      expect(globalLoader.state().rejected).toBe(true);
    });

    it('should set success', async () => {
      GlobalLoader.done();
      expect(globalLoader.state().done).toBe(true);
    });

    // it('should not start during success animation', async () => {
    //   GlobalLoader.start();
    //   await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
    //   GlobalLoader.done();
    //   GlobalLoader.start();
    //   expect(globalLoader.state().done).toBe(true);
    // });

    it('should start after success animation', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      GlobalLoader.done();
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);
      expect(globalLoader.state().done).toBe(false);
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(globalLoader.state().visible).toBe(true);
    });
  });
});
