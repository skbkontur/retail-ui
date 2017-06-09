import events from 'add-event-listener';
import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import LayoutEvents from '../../lib/LayoutEvents';
import getScrollWidth from '../../lib/dom/getScrollWidth';

import styles from './ScrollContainer.less';

const PADDING_RIGHT = 30;
const MIN_SCROLL_SIZE = 20;

export default class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollActive: false,
      scrollSize: 0,
      scrollPos: 0,

      // Mouse is moving where big scrollbar can be located.
      hover: false,
      // True when scroll is following mouse (mouse down on scroll).
      scrolling: false
    };
  }

  scrollTo(el) {
    if (!el) {
      return;
    }
    const maxScroll = el.offsetTop;
    if (this._inner.scrollTop > maxScroll) {
      this._inner.scrollTop = maxScroll;
      return;
    }

    const minScroll = el.offsetTop + el.scrollHeight - this._inner.offsetHeight;
    if (this._inner.scrollTop < minScroll) {
      this._inner.scrollTop = minScroll;
    }
  }

  render() {
    let scroll = null;
    if (this.state.scrollActive) {
      const scrollClass = classNames({
        [styles.scroll]: true,
        [styles.scrollInvert]: this.props.invert,
        [styles.scrollHover]: this.state.hover || this.state.scrolling
      });
      const scrollStyle = {
        top: this.state.scrollPos,
        height: this.state.scrollSize
      };
      scroll = (
        <div
          className={scrollClass}
          style={scrollStyle}
          onMouseDown={this._handleScrollMouseDown}
          onWheel={this._handleScrollWheel}
        />
      );
    }

    const innerStyle = {
      marginRight: -(PADDING_RIGHT + getScrollWidth()),
      maxHeight: this.props.maxHeight,
      paddingRight: PADDING_RIGHT
    };

    return (
      <div
        className={styles.root}
        onMouseMove={this._handleMouseMove}
        onMouseLeave={this._handleMouseLeave}
      >
        {scroll}
        <div ref={this._refInner} className={styles.inner} style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._reflow();

    events.addEventListener(this._inner, 'scroll', this._handleNativeScroll);
  }

  componentDidUpdate() {
    this._reflow();
  }

  componentWillUnmount() {
    events.removeEventListener(this._inner, 'scroll', this._handleNativeScroll);
  }

  _refInner = el => {
    this._inner = el;
  };

  _handleNativeScroll = () => {
    this._reflow();
    LayoutEvents.emit();
  };

  _reflow = () => {
    const state = this.state;
    const inner = this._inner;
    const containerHeight = inner.offsetHeight;
    const contentHeight = inner.scrollHeight;
    const scrollTop = inner.scrollTop;

    const scrollActive = containerHeight < contentHeight;

    if (!scrollActive && !this.state.scrollActive) {
      return;
    }

    if (scrollActive) {
      let scrollSize = containerHeight / contentHeight * containerHeight;

      if (scrollSize < MIN_SCROLL_SIZE) {
        scrollSize = MIN_SCROLL_SIZE;
      }

      const scrollPos =
        scrollTop /
        (contentHeight - containerHeight) *
        (containerHeight - scrollSize);

      if (state.scrollSize !== scrollSize || state.scrollPos !== scrollPos) {
        this.setState({
          scrollActive: true,
          scrollSize,
          scrollPos
        });
      }
    } else {
      this.setState({ scrollActive: false });
    }
  };

  _handleScrollMouseDown = event => {
    const target = global.document;
    const initialY = event.clientY;
    const initialScrollTop = this._inner.scrollTop;

    const mouseMove = event => {
      const ratio =
        (this._inner.scrollHeight - this._inner.offsetHeight) /
        (this._inner.offsetHeight - this.state.scrollSize);
      const deltaY = (event.clientY - initialY) * ratio;

      this._inner.scrollTop = initialScrollTop + deltaY;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    };
    const mouseUp = () => {
      events.removeEventListener(target, 'mousemove', mouseMove);
      events.removeEventListener(target, 'mouseup', mouseUp);
      this.setState({ scrolling: false });
    };

    events.addEventListener(target, 'mousemove', mouseMove);
    events.addEventListener(target, 'mouseup', mouseUp);
    this.setState({ scrolling: true });

    event.preventDefault();
  };

  _handleScrollWheel = event => {
    const inner = this._inner;

    if (
      event.deltaY > 0 &&
      inner.scrollHeight <= inner.scrollTop + inner.offsetHeight
    ) {
      return;
    }
    if (event.deltaY < 0 && inner.scrollTop <= 0) {
      return;
    }

    inner.scrollTop += event.deltaY;
    event.preventDefault();
  };

  _handleMouseMove = event => {
    const right =
      event.currentTarget.getBoundingClientRect().right - event.pageX;
    this._setHover(right <= 12);
  };

  _handleMouseLeave = event => {
    this._setHover(false);
  };

  _setHover(hover) {
    if (this.state.hover !== hover) {
      this.setState({ hover });
    }
  }
}

ScrollContainer.propTypes = {
  invert: PropTypes.bool,
  maxHeight: PropTypes.number
};
