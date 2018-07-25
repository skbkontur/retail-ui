import * as React from 'react';
import { mount } from 'enzyme';
import Popup from '../';
import toJson from 'enzyme-to-json';
import { PopupProps, PopupState } from '../Popup';

describe('Popup', () => {
  it('open and close without crash', () => {
    const anchor = document.createElement('button');

    anchor.id = 'test-id';
    anchor.innerHTML = 'test';

    const wrapper = mount(
      <Popup
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        opened={false}
        anchorElement={anchor as HTMLElement}
      >
        Test content
      </Popup>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({ opened: true });

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({ opened: false });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('сохраняет свое положение при повторном открытии', () => {
  //   const anchor = document.createElement('button');

  //   anchor.id = 'test-id';
  //   anchor.innerHTML = 'test';

  //   const wrapper = mount<PopupProps, PopupState>((
  //     <Popup
  //       positions={['top left', 'top right', 'bottom left', 'bottom right']}
  //       opened={false}
  //       anchorElement={anchor as HTMLElement}
  //     >
  //       Test content
  //     </Popup>
  //   ) as React.ReactElement<PopupProps>);

  //   expect(wrapper.state('location')).toBeNull();

  //   wrapper.setProps({ opened: true });

  //   expect(wrapper.state('location')).toEqual('bottom left');
  // });
});
