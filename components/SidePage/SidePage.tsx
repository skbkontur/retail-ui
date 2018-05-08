import * as events from 'add-event-listener';
import classNames from 'classnames';
import { EventSubscription } from 'fbemitter';
import * as React from 'react';
import LayoutEvents from '../../lib/LayoutEvents';
import stopPropagation from '../../lib/events/stopPropagation';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import ModalStack from '../ModalStack';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import ZIndex from '../ZIndex';
import SidePageBody from './SidePageBody';
import SidePageContainer from './SidePageContainer';
import { SidePageContext } from './SidePageContext';
import SidePageFooter from './SidePageFooter';
import SidePageHeader from './SidePageHeader';

import styles = require('./SidePage.less');

export interface SidePageProps {
  /**
   * Добавить блокирующий фон, когда сайдпейдж открыт
   */
  blockBackground?: boolean;

  /**
   * Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа
   */
  disableClose?: boolean;

  /**
   * Не закрывать сайдпейдж при клике на фон.
   */
  ignoreBackgroundClick?: boolean;

  /**
   * Задать ширину сайдпейджа
   */
  width?: number;

  /**
   * Вызывается, когда пользователь запросил закрытие сайдпейджа (нажал на фон, на
   * Escape или на крестик).
   */
  onClose?: () => void;
}

export interface SidePageState {
  stackPosition?: number;
  hasMarginRight?: boolean;
  hasShadow?: boolean;
  hasBackground?: boolean;
}

/**
 * Сайдпейдж
 *
 * Содержит в себе три компоненты: **SidePage.Header**,
 * **SidePage.Body** и **SidePage.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class SidePage extends React.Component<SidePageProps, SidePageState> {
  public static Header = SidePageHeader;
  public static Body = SidePageBody;
  public static Footer = SidePageFooter;
  public static Container = SidePageContainer;

  private stackSubscription: EventSubscription | null = null;

  constructor(props: SidePageProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    events.addEventListener(window, 'keydown', this.handleKeyDown);
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);
  }

  public componentWillUnmount() {
    events.removeEventListener(window, 'keydown', this.handleKeyDown);
    if (this.stackSubscription != null) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);
  }

  public render() {
    const rootStyle = this.props.blockBackground ? { width: '100%' } : {};
    const sidePageStyle = {
      width: this.props.width || (this.props.blockBackground ? 800 : 500),
      marginRight: this.state.hasMarginRight ? 20 : undefined
    };

    return (
      <RenderContainer>
        <ZIndex
          delta={1000}
          className={styles.root}
          onScroll={LayoutEvents.emit}
          style={rootStyle}
        >
          <HideBodyVerticalScroll
            allowScrolling={!this.props.blockBackground}
          />
          {this.props.blockBackground && (
            <div
              className={classNames(
                styles.background,
                this.state.hasBackground && styles.gray
              )}
            />
          )}
          <RenderLayer onClickOutside={this.handleClickOutside} active>
            <div
              className={classNames(
                styles.container,
                this.state.hasShadow && styles.shadow
              )}
              style={sidePageStyle}
            >
              <table className={styles.layout}>
                <tbody>
                  <SidePageContext.Provider value={this.requestClose}>
                    {this.props.children}
                  </SidePageContext.Provider>
                </tbody>
              </table>
            </div>
          </RenderLayer>
        </ZIndex>
      </RenderContainer>
    );
  }

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    const sidePages = stack.filter(x => x instanceof SidePage);
    const currentSidePagePosition = sidePages.indexOf(this);
    const isSidePageOnStackTop = stack[0] instanceof SidePage;

    const hasMarginRight =
      sidePages.length > 1 && currentSidePagePosition === sidePages.length - 1;
    const hasShadow =
      sidePages.length < 3 || currentSidePagePosition > sidePages.length - 3;
    const hasBackground =
      currentSidePagePosition === sidePages.length - 1 && isSidePageOnStackTop;

    this.setState({
      stackPosition: stack.indexOf(this),
      hasMarginRight,
      hasShadow,
      hasBackground
    });
  };

  private handleClickOutside = () => {
    if (this.state.stackPosition === 0 && !this.props.ignoreBackgroundClick) {
      this.requestClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.state.stackPosition !== 0) {
      return;
    }
    if (event.keyCode === 27) {
      stopPropagation(event);
      this.requestClose();
    }
  };

  private requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
}

export default SidePage;
