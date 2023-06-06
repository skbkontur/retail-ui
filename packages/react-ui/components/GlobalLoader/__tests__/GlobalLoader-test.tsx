import React from 'react';
import { render, screen } from '@testing-library/react';

import { GlobalLoader, GlobalLoaderDataTids } from '../GlobalLoader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_GLOBAL_LOADER_SHOW = 1000;
const DELAY_BEFORE_GLOBAL_LOADER_HIDE = 1000;
const DIFFERENCE = 100;

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
    it('should not show before DELAY_BEFORE_GLOBAL_LOADER_SHOW', async () => {
      render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />,
      );
      active = true;

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW - DIFFERENCE);
      expect(refGlobalLoader.current?.state.visible).toBe(false);
    });

    it('should set active', async () => {
      render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />,
      );
      await delay(DIFFERENCE);
      expect(refGlobalLoader.current?.state.visible).toBe(true);
    });

    it('should set error', async () => {
      const { rerender } = render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />);

      rerender(<GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        active={active}
        ref={refGlobalLoader}
        rejected
      />);

      expect(refGlobalLoader.current?.state.rejected).toBe(true);
    });

    it('should set success', async () => {
      const { rerender } = render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />);

      rerender(<GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        ref={refGlobalLoader}
        active={false}
      />);
      expect(refGlobalLoader.current?.state.done).toBe(true);
    });

    it('should start after success animation', async () => {
      const { rerender } = render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          active={active}
          ref={refGlobalLoader}
        />);

      rerender(<GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        ref={refGlobalLoader}
        active
      />);

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);

      rerender(<GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        ref={refGlobalLoader}
        active={false}
      />);

      rerender(<GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
        delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
        ref={refGlobalLoader}
        active
      />);

      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);

      expect(refGlobalLoader.current?.state.done).toBe(false);
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(refGlobalLoader.current?.state.visible).toBe(true);
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
