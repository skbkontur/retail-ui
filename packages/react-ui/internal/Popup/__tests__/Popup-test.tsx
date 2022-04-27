import React from 'react';
import { ComponentClass, mount, ReactWrapper } from 'enzyme';
import { Transition } from 'react-transition-group';
import { ReactComponentLike } from 'prop-types';

import { Popup, PopupProps, PopupState } from '../Popup';
import { delay } from '../../../lib/utils';
import { RenderContainer } from '../../RenderContainer';
import { ZIndex } from '../../ZIndex';
import { CommonWrapper } from '../../CommonWrapper';
import { ResponsiveLayout } from '../../../components/ResponsiveLayout';
import { RenderInnerContainer, Portal } from '../../RenderContainer/RenderInnerContainer';
import { Nullable } from '../../../typings/utility-types';

const openPopup = async (wrapper: ReactWrapper<PopupProps, PopupState, Popup>) =>
  new Promise<void>((resolve) => {
    wrapper.setProps({ opened: true }, async () => {
      await delay(100);
      resolve();
    });
  });

const closePopup = async (wrapper: ReactWrapper<PopupProps, PopupState, Popup>) =>
  new Promise<void>((resolve) => {
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
      disableAnimations
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

    const wrapper = mount<Popup>(
      (
        <Popup
          positions={['bottom right', 'top left', 'top right', 'bottom left']}
          opened={false}
          anchorElement={anchor}
        >
          Test content
        </Popup>
      ) as React.ReactElement<PopupProps>,
    );

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

    const wrapper = mount<Popup>(
      (
        <Popup
          positions={['top left', 'top right', 'bottom left', 'bottom right']}
          opened={false}
          anchorElement={anchor as HTMLElement}
          popupOffset={20}
        >
          Test content
        </Popup>
      ) as React.ReactElement<PopupProps>,
    );

    expect(wrapper.state('location')).toBeNull();

    const check = async () => {
      await openPopup(wrapper);

      expect(wrapper.state('location')!.position).toBe('bottom right');

      await closePopup(wrapper);
    };

    const checkLocation = async () => {
      for (let i = 0; i < 11; i++) {
        await check();
      }
    };

    await checkLocation();
  });
});

describe('properly renders opened/closed states ', () => {
  const closedPopupTree: ReactComponentLike[] = [
    ResponsiveLayout,
    CommonWrapper,
    RenderContainer,
    RenderInnerContainer,
  ];
  const openedPopupTree: ReactComponentLike[] = [
    ResponsiveLayout,
    CommonWrapper,
    RenderContainer,
    RenderInnerContainer,
    Portal,
    'Portal',
    Transition,
    CommonWrapper,
    ZIndex,
    `div`,
    'div[data-tid="PopupContent"]',
    'div[data-tid="PopupContentInner"]',
  ];

  function traverseTree(root: ReactWrapper<any>, tree: ReactComponentLike[]): Nullable<ReactWrapper> {
    return tree.reduce((found: Nullable<ReactWrapper>, toFind) => {
      if (found) {
        // NOTE: приходится кастовать к тайпингам Enzyme'а
        // (https://github.com/skbkontur/retail-ui/pull/1434/files#r289259497)
        const children = found.children(toFind as ComponentClass<any>);
        return children.length > 0 ? children : null;
      }
      return null;
    }, root);
  }

  const wrapper = renderWrapper();

  it('01 - initially closed', () => {
    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).toBeDefined();
    expect(innerContainer).not.toBeNull();
    expect(innerContainer).toHaveLength(1);
    expect(innerContainer!.children()).toHaveLength(0);
  });

  it('02 - then opened', async () => {
    await openPopup(wrapper);
    wrapper.update();

    const content = traverseTree(wrapper, openedPopupTree);
    expect(content).toBeDefined();
    expect(content).not.toBeNull();
    expect(content).toHaveLength(1);
    expect(content!.text()).toBe('Test content');
  });

  it('03 - and closed again', async () => {
    await closePopup(wrapper);
    wrapper.update();

    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).not.toBeNull();
    expect(innerContainer).toHaveLength(1);
    expect(innerContainer!.children()).toHaveLength(0);
  });
});
