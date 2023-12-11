import React from 'react';
import { render, screen } from '@testing-library/react';

import { GlobalLoader, GlobalLoaderDataTids } from '../GlobalLoader';
import { delay } from '../../../lib/utils';

const DELAY_BEFORE_GLOBAL_LOADER_SHOW = 1000;
const DELAY_BEFORE_GLOBAL_LOADER_HIDE = 1000;
const DIFFERENCE = 100;

jest.unmock('lodash.debounce');

describe('Global Loader', () => {
  const refGlobalLoader = React.createRef<GlobalLoader>();
  const refGlobalLoader2 = React.createRef<GlobalLoader>();

  it('should be the only one', async () => {
    render(<GlobalLoader expectedResponseTime={2000} active ref={refGlobalLoader} />);
    render(<GlobalLoader expectedResponseTime={2000} active ref={refGlobalLoader2} />);

    await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);

    expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
    expect(refGlobalLoader.current?.state.dead).toBe(true);
    expect(refGlobalLoader2.current?.state.dead).toBe(false);
  });

  describe('with props', () => {
    it('should set active', async () => {
      render(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          active
          ref={refGlobalLoader}
        />,
      );
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW - DIFFERENCE);
      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();

      await delay(DIFFERENCE);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
    });

    it('should set error', async () => {
      const { rerender } = render(<GlobalLoader expectedResponseTime={2000} ref={refGlobalLoader} />);

      rerender(<GlobalLoader expectedResponseTime={2000} active ref={refGlobalLoader} rejected />);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toHaveAttribute('data-status', 'error');
    });

    it('should set success', async () => {
      const { rerender } = render(<GlobalLoader expectedResponseTime={2000} active ref={refGlobalLoader} />);

      rerender(<GlobalLoader expectedResponseTime={2000} ref={refGlobalLoader} active={false} />);
      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();
    });

    it('should start after success animation', async () => {
      const { rerender } = render(<GlobalLoader expectedResponseTime={2000} ref={refGlobalLoader} />);

      rerender(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          ref={refGlobalLoader}
          active
        />,
      );

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);

      rerender(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          ref={refGlobalLoader}
          active={false}
        />,
      );

      rerender(
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={DELAY_BEFORE_GLOBAL_LOADER_SHOW}
          delayBeforeHide={DELAY_BEFORE_GLOBAL_LOADER_HIDE}
          ref={refGlobalLoader}
          active
        />,
      );

      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);

      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
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
      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
    });

    it('should set error', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();

      GlobalLoader.reject();
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toHaveAttribute('data-status', 'error');
    });

    it('should set success', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();

      GlobalLoader.done();
      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toHaveAttribute('data-status', 'success');

      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);
      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();
    });

    it('should start after success animation', async () => {
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      GlobalLoader.done();
      GlobalLoader.start();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_HIDE);
      expect(screen.queryByTestId(GlobalLoaderDataTids.root)).not.toBeInTheDocument();

      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);

      expect(screen.getByTestId(GlobalLoaderDataTids.root)).toBeInTheDocument();
    });

    it('should not change state unless there was a call to "start" before "done"', async () => {
      const defaultState = refGlobalLoader.current?.state || {};

      GlobalLoader.done();
      await delay(DELAY_BEFORE_GLOBAL_LOADER_SHOW);
      expect(defaultState).toEqual(refGlobalLoader.current?.state);
    });
  });
});
