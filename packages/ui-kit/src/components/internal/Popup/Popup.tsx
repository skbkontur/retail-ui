import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Transition } from 'react-transition-group';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';

import LayoutEvents from '../../../lib/LayoutEvents';
import ZIndex from '../ZIndex';
import PopupHelper, { PositionObject, Rect } from './PopupHelper';
import PopupPin from './PopupPin';
import { Direction, PopupStyledView, TransitionState } from './PopupView';

export interface PopupProps {
  anchorElement: HTMLElement;
  backgroundColor?: string;
  children: React.ReactNode | (() => React.ReactNode);
  hasPin?: boolean;
  hasShadow?: boolean;
  margin?: number;
  opened: boolean;
  pinOffset?: number;
  pinSize?: number;
  popupOffset?: number;
  positions: string[];
  onCloseRequest?: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface DefaultPopupProps {
  margin: number;
  popupOffset: number;
  pinSize: number;
  pinOffset: number;
  hasPin: boolean;
  hasShadow: boolean;
  backgroundColor: string;
}

export type PropsWithDefaults = PopupProps & DefaultPopupProps;

export interface Location {
  coordinates: {
    left: number;
    top: number;
  };
  position: string;
}

export interface PopupState {
  location: Location | null;
}

export default class Popup extends React.Component<PopupProps, PopupState> {
  public static defaultProps: DefaultPopupProps = {
    margin: 10,
    popupOffset: 0,
    pinSize: 8,
    pinOffset: 16,
    hasPin: false,
    hasShadow: false,
    backgroundColor: '#fff'
  };

  public state: PopupState = {
    location: null
  };

  private layoutEventsToken: { remove(): void } | null = null;
  private lastPopupElement: HTMLElement | null = null;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);
  }

  public componentDidUpdate() {
    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying _updateLocation to ensure that ref is set
     */
    this.delayUpdateLocation();
  }

  public componentWillUnmount() {
    if (this.layoutEventsToken) {
      this.layoutEventsToken.remove();
    }
  }

  public render() {
    const location = this.state.location || this.getDummyLocation();

    return (
      <RenderLayer
        onClickOutside={this.handleClickOutside}
        onFocusOutside={this.handleFocusOutside}
        /**
         * If onCloseRequest is not specified _handleClickOutside and _handleFocusOutside
         * are doing nothing. So there is no need in RenderLayer at all.
         */
        active={this.props.onCloseRequest && this.props.opened}
      >
        <RenderContainer>{this.renderContent(location)}</RenderContainer>
      </RenderLayer>
    );
  }

  private renderContent(location: Location) {
    if (!this.props.opened) {
      return null;
    }

    const children =
      typeof this.props.children === 'function' ? this.props.children() : this.props.children;

    if (children == null) {
      return null;
    }

    const { direction } = PopupHelper.getPositionObject(location.position);

    return (
      <Transition timeout={{ enter: 0, exit: 200 }} appear={true} in={true}>
        {(state: TransitionState) => (
          <PopupStyledView
            key={this.state.location ? 'real' : 'dummy'}
            delta={1000}
            innerRef={this.refPopupElement}
            hasShadow={this.props.hasShadow}
            style={{
              top: location.coordinates.top,
              left: location.coordinates.left,
              backgroundColor: this.props.backgroundColor
            }}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            direction={direction as Direction}
            transitionState={state}
          >
            {children}
            {this.renderPin(location.position)}
          </PopupStyledView>
        )}
      </Transition>
    );
  }

  private refPopupElement = (element: ZIndex) => {
    if (element) {
      this.lastPopupElement = element && (findDOMNode(element) as HTMLElement);
    }
  };

  private renderPin(position: string) {
    const { pinSize, pinOffset, hasShadow, backgroundColor } = this.props as PropsWithDefaults;
    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this.lastPopupElement}
          popupPosition={position}
          size={pinSize}
          offset={pinOffset}
          borderWidth={hasShadow ? 1 : 0}
          backgroundColor={backgroundColor}
          borderColor="transparent"
        />
      )
    );
  }

  private handleClickOutside = () => {
    this.requestClose();
  };

  private handleFocusOutside = () => {
    this.requestClose();
  };

  private handleLayoutEvent = () => {
    if (this.state.location) {
      this.updateLocation();
    }
  };

  private delayUpdateLocation() {
    window.requestAnimationFrame(() => this.updateLocation());
  }

  private updateLocation() {
    if (!this.props.opened) {
      if (this.state.location) {
        this.setState({ location: null });
      }
      return;
    }

    const popupElement = this.lastPopupElement;
    if (!popupElement) {
      return;
    }

    const location = this.getLocation(popupElement);
    if (!this.locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  }

  private requestClose = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };

  private locationEquals(x: Location | null, y: Location | null) {
    if (x === y) {
      return true;
    }

    if (x === null || y === null) {
      return false;
    }

    return (
      x.coordinates.left === y.coordinates.left &&
      x.coordinates.top === y.coordinates.top &&
      x.position === y.position
    );
  }

  private getDummyLocation() {
    return {
      coordinates: {
        top: -9999,
        left: -9999
      },
      position: 'top left'
    };
  }

  private getLocation(popupElement: HTMLElement): Location {
    const { anchorElement, positions, margin, popupOffset } = this.props as PropsWithDefaults;

    if (!anchorElement) {
      throw new Error('Anchor element is not defined');
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    for (const position of positions) {
      const positionObject = PopupHelper.getPositionObject(position);
      const coordinates = this.getCoordinates(
        anchorRect,
        popupRect,
        positionObject,
        margin,
        popupOffset + this.getPinnedPopupOffset(anchorRect, positionObject)
      );
      if (
        PopupHelper.isAbsoluteRectFullyVisible({
          top: coordinates.top,
          left: coordinates.left,
          height: popupRect.height,
          width: popupRect.width
        })
      ) {
        return { coordinates, position };
      }
    }

    const positionObjectFirst = PopupHelper.getPositionObject(positions[0]);
    const coordinatesFirst = this.getCoordinates(
      anchorRect,
      popupRect,
      positionObjectFirst,
      margin,
      popupOffset + this.getPinnedPopupOffset(anchorRect, positionObjectFirst)
    );
    return { coordinates: coordinatesFirst, position: positions[0] };
  }

  private getPinnedPopupOffset(anchorRect: Rect, positionObject: PositionObject) {
    if (!this.props.hasPin || /center|middle/.test(positionObject.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(positionObject.direction)
      ? anchorRect.width
      : anchorRect.height;

    const { pinOffset, pinSize } = this.props as PropsWithDefaults;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  private getCoordinates(
    anchorRect: Rect,
    popupRect: Rect,
    positionObject: PositionObject,
    margin: number,
    popupOffset: number
  ) {
    switch (positionObject.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this.getHorizontalPosition(anchorRect, popupRect, positionObject.align, popupOffset)
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this.getHorizontalPosition(anchorRect, popupRect, positionObject.align, popupOffset)
        };
      case 'left':
        return {
          top: this.getVerticalPosition(anchorRect, popupRect, positionObject.align, popupOffset),
          left: anchorRect.left - popupRect.width - margin
        };
      case 'right':
        return {
          top: this.getVerticalPosition(anchorRect, popupRect, positionObject.align, popupOffset),
          left: anchorRect.left + anchorRect.width + margin
        };
      default:
        throw new Error(`Unxpected direction '${positionObject.direction}'`);
    }
  }

  private getHorizontalPosition(
    anchorRect: Rect,
    popupRect: Rect,
    align: string,
    popupOffset: number
  ) {
    switch (align) {
      case 'left':
        return anchorRect.left - popupOffset;
      case 'center':
        return anchorRect.left - (popupRect.width - anchorRect.width) / 2;
      case 'right':
        return anchorRect.left - (popupRect.width - anchorRect.width) + popupOffset;
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }

  private getVerticalPosition(
    anchorRect: Rect,
    popupRect: Rect,
    align: string,
    popupOffset: number
  ) {
    switch (align) {
      case 'top':
        return anchorRect.top - popupOffset;
      case 'middle':
        return anchorRect.top - (popupRect.height - anchorRect.height) / 2;
      case 'bottom':
        return anchorRect.top - (popupRect.height - anchorRect.height) + popupOffset;
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }
}
