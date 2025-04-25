import React from 'react';
import type { ComponentClass, ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { Transition } from 'react-transition-group';
import type { ReactComponentLike } from 'prop-types';
import { render, screen } from '@testing-library/react';

import { PopupDataTids } from '..';
import { MobilePopupDataTids } from '../../MobilePopup';
import type { InstanceWithRootNode } from '../../../lib/rootNode';
import type { PopupProps, PopupState } from '../Popup';
import { Popup } from '../Popup';
import { delay } from '../../../lib/utils';
import { RenderContainer } from '../../RenderContainer';
import { ZIndex } from '../../ZIndex';
import { CommonWrapper } from '../../CommonWrapper';
import { ResponsiveLayout } from '../../../components/ResponsiveLayout';
import { RenderInnerContainer, Portal } from '../../RenderContainer/RenderInnerContainer';
import type { Nullable } from '../../../typings/utility-types';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';

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

const renderWrapper = (
  props?: Partial<PopupProps>,
  ref?: React.Ref<Popup>,
): ReactWrapper<PopupProps, PopupState, Popup> => {
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
      ref={ref}
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
    expect(wrapper.state('location')?.position).toBe('bottom right');
    wrapper.unmount();
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

      expect(wrapper.state('location')?.position).toBe('bottom right');

      await closePopup(wrapper);
    };

    const checkLocation = async () => {
      for (let i = 0; i < 11; i++) {
        await check();
      }
    };

    await checkLocation();
    wrapper.unmount();
  });
});

describe('properly renders opened/closed states', () => {
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

  afterAll(() => {
    wrapper.unmount();
  });

  it('01 - initially closed', () => {
    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).toBeDefined();
    expect(innerContainer).not.toBeNull();
    expect(innerContainer).toHaveLength(1);
    expect(innerContainer?.children()).toHaveLength(0);
  });

  it('02 - then opened', async () => {
    await openPopup(wrapper);
    wrapper.update();

    const content = traverseTree(wrapper, openedPopupTree);
    expect(content).toBeDefined();
    expect(content).not.toBeNull();
    expect(content).toHaveLength(1);
    expect(content?.text()).toBe('Test content');
  });

  it('03 - and closed again', async () => {
    await closePopup(wrapper);
    wrapper.update();

    const innerContainer = traverseTree(wrapper, closedPopupTree);
    expect(innerContainer).not.toBeNull();
    expect(innerContainer).toHaveLength(1);
    expect(innerContainer?.children()).toHaveLength(0);
  });
});

describe('rootNode', () => {
  const popupRef = React.createRef<Popup & InstanceWithRootNode>();

  const TestPopup = ({ opened }: Pick<PopupProps, 'opened'>) => {
    const anchor = <button />;

    return (
      <Popup
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        opened={opened}
        anchorElement={anchor}
        disableAnimations
        ref={popupRef}
      >
        Test content
      </Popup>
    );
  };

  const testRootNode = (
    Component: ({ opened }: Pick<PopupProps, 'opened'>) => JSX.Element,
    popupRef: React.RefObject<Popup & InstanceWithRootNode>,
    dataTid: string,
  ) => {
    it('is null by default when closed and getRootNode is defined', () => {
      render(<Component opened={false} />);

      expect(popupRef.current?.getRootNode).toBeDefined();

      const rootNode = popupRef.current?.getRootNode();
      expect(popupRef.current).not.toBeNull();
      expect(rootNode).toBeNull();
    });

    it('is content container when opened and is null when closed', async () => {
      const { rerender } = render(<Component opened />);

      const contentContainer = await screen.findByTestId(dataTid);
      let rootNode = popupRef.current?.getRootNode();

      expect(popupRef.current).not.toBeNull();
      expect(rootNode).toBeInstanceOf(HTMLElement);
      expect(rootNode).toBe(contentContainer);

      rerender(<Component opened={false} />);
      await delay(0);

      rootNode = popupRef.current?.getRootNode();
      expect(popupRef.current).not.toBeNull();
      expect(rootNode).toBeNull();
    });
  };

  describe('on desktop', () => {
    testRootNode(TestPopup, popupRef, PopupDataTids.root);
  });
  describe('on mobile', () => {
    const calcMatches = (query: string) => query === LIGHT_THEME.mobileMediaQuery;
    const oldMatchMedia = window.matchMedia;
    const matchMediaMock = jest.fn().mockImplementation((query) => {
      return {
        matches: calcMatches(query),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    beforeEach(() => {
      window.matchMedia = matchMediaMock;
    });

    afterEach(() => {
      window.matchMedia = oldMatchMedia;
    });

    testRootNode(TestPopup, popupRef, MobilePopupDataTids.container);
  });
});
