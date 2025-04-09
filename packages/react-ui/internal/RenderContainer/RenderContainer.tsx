import React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';
import debounce from 'lodash.debounce';

import { EmotionConsumer, PopupConsumer } from '../../lib/theming/Emotion';
import { Nullable } from '../../typings/utility-types';
import { getRandomID } from '../../lib/utils';
import { Upgrade } from '../../lib/Upgrades';
import { callChildRef } from '../../lib/callChildRef/callChildRef';
import { isShadowRoot } from '../../lib/shadowDom/isShadowRoot';
import { PopupStrategy } from '../../lib/styles/StylesContainer';

import { RenderInnerContainer } from './RenderInnerContainer';
import { RenderContainerProps } from './RenderContainerTypes';

interface GlobalWithReactTesting {
  ReactTesting?: any;
}

export const PORTAL_INLET_ATTR = 'data-render-container-id';
export const PORTAL_OUTLET_ATTR = 'data-rendered-container-id';

export class RenderContainer extends React.Component<RenderContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderContainer';
  public static displayName = 'RenderContainer';

  private static getRootId = () => getRandomID();
  private domContainer: Nullable<HTMLElement> = null;
  private emotion!: Emotion;
  private popupStrategy!: PopupStrategy;

  private readonly rootId: string = RenderContainer.getRootId();

  public shouldComponentUpdate(nextProps: RenderContainerProps) {
    if (!this.props.children && nextProps.children) {
      this.mountContainer();
    }
    if (this.props.children && !nextProps.children) {
      this.unmountContainer();
    }
    return true;
  }

  public componentWillUnmount() {
    this.destroyContainer();
    isBrowser(globalObject) && globalObject.removeEventListener('scroll', this.reflowContainer);
    isBrowser(globalObject) && globalObject.removeEventListener('resize', this.reflowContainer);
  }

  public render() {
    return (
      <PopupConsumer>
        {({ popupStrategy }) => {
          this.popupStrategy = popupStrategy ?? 'auto';
          return (
            <EmotionConsumer>
              {(emotion) => {
                this.emotion = emotion;
                return this.renderMain();
              }}
            </EmotionConsumer>
          );
        }}
      </PopupConsumer>
    );
  }

  private reflowContainer = () => {
    const root = this.emotion.sheet.container.getRootNode() as ShadowRoot | Document;
    if (isShadowRoot(root) && this.domContainer && isBrowser(globalObject)) {
      this.domContainer.setAttribute(
        'style',
        `position: fixed;z-index: 1;
         margin-top: -${root.host.getBoundingClientRect().height + globalObject.scrollY}px;
         margin-left: -${globalObject.scrollX}px;
         `,
      );
    }
  };

  private debouncedReflowContainer = debounce(this.reflowContainer, 32);

  private renderMain = () => {
    if (this.props.children) {
      this.mountContainer();
    }

    return <RenderInnerContainer {...this.props} domContainer={this.domContainer} rootId={this.rootId} />;
  };

  private createContainer() {
    const domContainer = globalObject.document?.createElement('div');

    if (domContainer) {
      domContainer.setAttribute('class', Upgrade.getSpecificityClassName());
      const root = this.emotion.sheet.container.getRootNode() as ShadowRoot | Document;
      if (isShadowRoot(root) && isBrowser(globalObject)) {
        const rootHeight = root.host.getBoundingClientRect().height;
        switch (this.popupStrategy) {
          case 'relative':
            domContainer.setAttribute('style', `position: relative; top: -${rootHeight}px`);
            break;
          case 'auto':
          case 'absolute':
            domContainer.setAttribute('style', `position: absolute; z-index: 1; margin-top: -${rootHeight}px;`);
            break;
          case 'fixed': {
            globalObject.addEventListener('scroll', this.debouncedReflowContainer);
            globalObject.addEventListener('resize', this.debouncedReflowContainer);
            domContainer.setAttribute(
              'style',
              `position: fixed;z-index: 1;
              margin-top: -${rootHeight + globalObject.scrollY}px;
              margin-left: -${globalObject.scrollX}px;
              `,
            );
            break;
          }
        }
      }
      domContainer.setAttribute(PORTAL_OUTLET_ATTR, `${this.rootId}`);
      this.domContainer = domContainer;
    }
  }

  private mountContainer() {
    const globalWithReactTesting = globalObject as GlobalWithReactTesting;

    if (!this.domContainer) {
      this.createContainer();
    }

    const stylesRoot = this.emotion.sheet?.container?.getRootNode();
    const rootElement = isShadowRoot(stylesRoot) && stylesRoot ? stylesRoot : globalObject.document?.body;

    if (this.domContainer && this.domContainer.parentNode !== rootElement) {
      rootElement?.appendChild(this.domContainer);

      if (this.props.containerRef) {
        callChildRef(this.props.containerRef, this.domContainer);
      }
      if (globalWithReactTesting.ReactTesting) {
        globalWithReactTesting.ReactTesting.addRenderContainer(this.rootId, this);
      }
    }
  }

  private destroyContainer() {
    if (this.domContainer) {
      this.unmountContainer();
      this.domContainer = null;
    }
  }

  private unmountContainer() {
    if (this.domContainer && this.domContainer.parentNode) {
      this.domContainer.parentNode.removeChild(this.domContainer);

      if (this.props.containerRef) {
        callChildRef(this.props.containerRef, null);
      }

      const globalWithReactTesting = globalObject as GlobalWithReactTesting;
      if (globalWithReactTesting.ReactTesting) {
        globalWithReactTesting.ReactTesting.removeRenderContainer(this.rootId);
      }
    }
  }
}
