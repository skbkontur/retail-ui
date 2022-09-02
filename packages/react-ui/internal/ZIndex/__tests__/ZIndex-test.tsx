import React, { useState } from 'react';
import { mount } from 'enzyme';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ZIndex } from '../ZIndex';
import { globalThat } from '../../../lib/SSRSafe';

describe('ZIndex', () => {
  it("shouldn't call unmoun/mount child component while switch `active` prop", () => {
    const unmountFn = jest.fn();
    class Content extends React.Component {
      public componentWillUnmount() {
        unmountFn();
      }
      public render() {
        return <div />;
      }
    }
    const wrapper = mount(
      <ZIndex>
        <Content />
      </ZIndex>,
    );

    wrapper.setProps({ applyZIndex: false });

    expect(unmountFn).not.toHaveBeenCalled();
  });

  it('should update `zIndex` style when update `priority` prop', () => {
    const DemoUpdatePriority = () => {
      const [priority, setPriority] = useState(1);
      return (
        <>
          <button data-tid="priority" onClick={() => setPriority(2)}>
            set priority to 2
          </button>
          <ZIndex data-tid="z-index" priority={priority} />,
        </>
      );
    };

    render(<DemoUpdatePriority />);
    const zIndex = screen.getByTestId('z-index');
    const priority = screen.getByTestId('priority');

    expect(zIndex).toHaveStyle('z-index: 1000');
    userEvent.click(priority);
    expect(zIndex).toHaveStyle('z-index: 2000');
  });

  it('should update `zIndex` style when update `delta` prop', () => {
    const DemoUpdatePriority = () => {
      const [delta, setDelta] = useState<number | undefined>();
      return (
        <>
          <button data-tid="delta" onClick={() => setDelta(11)}>
            set delta to 11
          </button>
          <ZIndex data-tid="z-index-1" priority={5} />
          <ZIndex data-tid="z-index-2" priority={5} delta={delta} />
        </>
      );
    };

    render(<DemoUpdatePriority />);
    const zIndex1 = screen.getByTestId('z-index-1');
    const zIndex2 = screen.getByTestId('z-index-2');
    const delta = screen.getByTestId('delta');

    expect(zIndex1).toHaveStyle('z-index: 5000');
    expect(zIndex2).toHaveStyle('z-index: 5010');
    userEvent.click(delta);
    expect(zIndex1).toHaveStyle('z-index: 5000');
    expect(zIndex2).toHaveStyle('z-index: 5011');
  });

  it('should store correct zIndexes in `__RetailUiZIndexes`', () => {
    globalThat.__RetailUiZIndexes = [];
    const DemoUpdatePriority = () => {
      const [delta, setDelta] = useState<number | undefined>();
      return (
        <>
          <button data-tid="delta" onClick={() => setDelta(11)}>
            set delta to 11
          </button>
          <ZIndex priority={3} />
          <ZIndex priority={3} delta={delta} />
        </>
      );
    };

    render(<DemoUpdatePriority />);
    const delta = screen.getByTestId('delta');

    expect(globalThat.__RetailUiZIndexes).toEqual([3000, 3010]);
    userEvent.click(delta);
    expect(globalThat.__RetailUiZIndexes).toEqual([3000, 3011]);
  });

  it('should not add wrapper if `useWrapper = false`', async () => {
    render(<ZIndex data-tid="z-index" useWrapper={false} />);

    await waitFor(() => {
      expect(screen.queryByTestId('z-index')).not.toBeInTheDocument();
    });
  });
});
