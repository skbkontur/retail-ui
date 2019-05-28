import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Popup, { PopupProps, PopupState } from '../Popup';
import { delay } from '../../../lib/utils';
import RenderContainer from '../../RenderContainer/RenderContainer';
import ZIndex from '../../ZIndex';
import { Transition } from 'react-transition-group';
import LifeCycleProxy from '../../internal/LifeCycleProxy';
import ReactDOM from 'react-dom';
import { RenderInnerContainer as RenderContainerNative } from '../../RenderContainer/RenderContainerNative';
import { RenderInnerContainer as RenderContainerFallback } from '../../RenderContainer/RenderContainerFallback';
import { Nullable } from '../../../typings/utility-types';

const HAS_BUILTIN_PORTAL = !!ReactDOM.createPortal;
const RenderInnerContainer = HAS_BUILTIN_PORTAL ? RenderContainerNative : RenderContainerFallback;

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
      anchorElement={anchor}
      disableAnimations={true}
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
        anchorElement={anchor}
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


describe('properly renders opened/closed states ', () => {
  type TreeNodeType = React.ComponentClass<any> | string
  const closedPopupTree: TreeNodeType[] = [RenderContainer, RenderInnerContainer];
  const openedPopupTree: TreeNodeType[] = [RenderContainer, RenderInnerContainer, LifeCycleProxy, Transition, ZIndex, 'div.popup', 'div.content', 'div.contentInner'];

  function traverseTree(root: ReactWrapper<any>, tree: TreeNodeType[]): Nullable<ReactWrapper> {
    return tree.reduce((found: Nullable<ReactWrapper>, toFind) => found ? found.children(toFind as string) : null, root);
  }

  const wrapper = renderWrapper();

  it('01 - initially closed', () => {
    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).toBeDefined();
    expect(innerContainer!.children()).toHaveLength(0);
  });

  it('02 - then opened', async () => {
    await openPopup(wrapper);
    wrapper.update();

    const content = traverseTree(wrapper, openedPopupTree);
    expect(content).toBeDefined();
    expect(content!.text()).toBe('Test content');
  });

  it('03 - and closed again', async () => {
    await closePopup(wrapper);
    wrapper.update();

    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).toBeDefined();
    expect(innerContainer!.children()).toHaveLength(0);
  });
});
