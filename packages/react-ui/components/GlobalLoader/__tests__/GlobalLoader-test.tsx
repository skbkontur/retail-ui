import React from 'react';
import { render, screen } from '@testing-library/react';

import { GlobalLoader, GlobalLoaderDataTids, GlobalLoaderProps, GlobalLoaderState } from '../GlobalLoader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_GLOBAL_LOADER_SHOW = 1000;
const DELAY_BEFORE_GLOBAL_LOADER_HIDE = 1000;
const DIFFERENCE = 100;

// async function setSuccessAndStart(globalLoader: ReactWrapper<GlobalLoaderProps, GlobalLoaderState, GlobalLoader>) {
//   globalLoader.setProps({ active: true });
//   globalLoader.update();
//   await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
//   globalLoader.setProps({ active: false });
//   globalLoader.update();
//   globalLoader.setProps({ active: true });
//   globalLoader.update();
// }

describe('Global Loader', () => {
  let active = false;
  const refGlobalLoader = React.createRef<GlobalLoader>();
  const refGlobalLoader2 = React.createRef<GlobalLoader>();

  it('should be the only one', async () => {
    active = true;
    render(
      <GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        active={active}
        ref={refGlobalLoader}
      />,
    );
    render(<GlobalLoader expectedResponseTime={2000} active={active} ref={refGlobalLoader2} />)


    expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();

    expect(refGlobalLoader.current?.state.dead).toBe(true);
    expect(refGlobalLoader2.current?.state.dead).toBe(false);
  });

  describe('with props', () => {

    beforeEach(() => {
      render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />,
      );
    });

    it('should not show before DELAY_BEFORE_GLOBAL_LOADER_SHOW', async () => {
      active = true;
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW - DIFFERENCE);
      expect(refGlobalLoader.current?.state.visible).toBe(false);
    });

    it('should set active', async () => {
      await delay(DIFFERENCE);
      expect(refGlobalLoader.current?.state.visible).toBe(true);
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
      render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          ref={refGlobalLoader}
        />,
      );
    });

    it('should set active', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
      screen.debug();
      expect(refGlobalLoader.current?.state.visible).toBe(true);
    });

    it('should set error', async () => {
      GlobalLoader.start();

      GlobalLoader.reject();

      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
      expect(refGlobalLoader.current?.state.rejected).toBe(true);
    });

    it('should set success', async () => {
      GlobalLoader.done();

      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();
      expect(refGlobalLoader.current?.state.done).toBe(true);
    });

    it('should start after success animation', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      GlobalLoader.done();
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);
      expect(refGlobalLoader.current?.state.done).toBe(false);
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);

      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
      expect(refGlobalLoader.current?.state.visible).toBe(true);
    });
  });
});
