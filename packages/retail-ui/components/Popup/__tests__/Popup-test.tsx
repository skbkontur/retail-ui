import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Popup, { PopupProps, PopupState } from '../Popup';
import toJson from 'enzyme-to-json';
import { delay } from '../../../lib/utils';

const openPopup = async (wrapper: ReactWrapper<PopupProps, PopupState, Popup>) =>
  new Promise(async resolve => {
    wrapper.setProps({ opened: true }, async () => {
      await delay(100);
      resolve();
    });
  });

const closePopup = async (wrapper: ReactWrapper<PopupProps, PopupState, Popup>) =>
  new Promise(async resolve => {
    wrapper.setProps({ opened: false }, async () => {
      await delay(100);
      resolve();
    });
  });

const renderWrapper = (props?: Partial<PopupProps>): ReactWrapper<PopupProps, PopupState, Popup> => {
  const anchor = document.createElement('button');

  anchor.id = 'test-id';
  anchor.innerHTML = 'test';

  return mount(
    <Popup
      positions={['bottom left', 'bottom right', 'top left', 'top right']}
      opened={false}
      anchorElement={anchor as HTMLElement}
      {...props}
    >
      Test content
    </Popup>,
  );
};

describe('Popup', () => {
  jest.setTimeout(10000);

  it('по дефолту открывается в первой переданной позиции', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'test-id';
    anchor.innerHTML = 'test';

    const wrapper = mount<Popup>((
      <Popup
        positions={['bottom right', 'top left', 'top right', 'bottom left']}
        opened={false}
        anchorElement={anchor as HTMLElement}
      >
        Test content
      </Popup>
    ) as React.ReactElement<PopupProps>);

    expect(wrapper.state('location')).toBeNull();

    await openPopup(wrapper);

    expect(wrapper.state('location')).not.toBeNull();
    expect(wrapper.state('location')!.position).toBe('bottom right');
  });

  it('одна и та же позиция при каждом открытии', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'test-id';
    anchor.innerHTML = 'test';
    anchor.style.setProperty('margin', '0 0 100px 0');

    const wrapper = mount<Popup>((
      <Popup
        positions={['top left', 'top right', 'bottom left', 'bottom right']}
        opened={false}
        anchorElement={anchor as HTMLElement}
        popupOffset={20}
      >
        Test content
      </Popup>
    ) as React.ReactElement<PopupProps>);

    expect(wrapper.state('location')).toBeNull();

    const check = () =>
      new Promise(async resolve => {
        await openPopup(wrapper);

        expect(wrapper.state('location')!.position).toBe('bottom right');

        await closePopup(wrapper);

        expect(wrapper.state('location')).toBeNull();

        resolve();
      });

    const checkLocation = async () => {
      for (let i = 0; i < 11; i++) {
        await check();
      }
    };

    await checkLocation();
  });
});

describe('Popup snapshots: ', () => {
  it('open and close popup', async () => {
    const wrapper = renderWrapper();

    expect(toJson(wrapper)).toMatchSnapshot('closed popup');

    await openPopup(wrapper);
    expect(toJson(wrapper)).toMatchSnapshot('opened popup');

    await closePopup(wrapper);
    wrapper.update();
    /** Ждем когда кончится анимация react-transition-group и случится unmount */
    await delay(300);
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot('closed popup again');
  });
});
