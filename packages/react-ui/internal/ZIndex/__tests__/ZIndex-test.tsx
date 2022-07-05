import React, { useState } from 'react';
import { mount } from 'enzyme';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ZIndex } from '../ZIndex';

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

    expect(unmountFn).not.toBeCalled();
  });

  it('should update `zIndex` style when update `priority` prop', () => {
    const DemoUpdatePriority = () => {
      const [priority, setPriority] = useState(1);
      return (
        <>
          <button data-tid="priority" onClick={() => setPriority(2)}>
            set priority to 3
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
          <ZIndex data-tid="z-index" priority={5} delta={delta} />,
        </>
      );
    };

    render(<DemoUpdatePriority />);
    const zIndex = screen.getByTestId('z-index');
    const delta = screen.getByTestId('delta');

    expect(zIndex).toHaveStyle('z-index: 5000');
    userEvent.click(delta);
    expect(zIndex).toHaveStyle('z-index: 5011');
  });

  it('should not store old zIndexes in `__RetailUiZIndexes`', () => {
    global.__RetailUiZIndexes = [];
    const DemoUpdatePriority = () => {
      const [delta, setDelta] = useState<number | undefined>();
      return (
        <>
          <button data-tid="delta" onClick={() => setDelta(11)}>
            set delta to 11
          </button>
          <ZIndex data-tid="z-index" priority={3} delta={delta} />,
        </>
      );
    };

    render(<DemoUpdatePriority />);
    const delta = screen.getByTestId('delta');
    userEvent.click(delta);

    expect(global.__RetailUiZIndexes).not.toContainEqual(3000);
  });

  it('should not add wrapper if `contextOnly` is set to `true`', async () => {
    render(<ZIndex data-tid="z-index" contextOnly />);

    await waitFor(() => {
      expect(screen.queryByTestId('z-index')).not.toBeInTheDocument();
    });
  });
});
