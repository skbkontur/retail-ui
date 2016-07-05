import events from 'add-event-listener';
import classNames from 'classnames';
import ExecutionEnvironment from 'exenv';
import React, {PropTypes} from 'react';

import styles from './ScrollContainer.less';

const SCROLL_WIDTH = measureScrollWidth();
const PADDING_RIGHT = 30;

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
      scrolling: false,
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
        [styles.scrollHover]: this.state.hover || this.state.scrolling,
      });
      const scrollStyle = {
        top: this.state.scrollPos,
        height: this.state.scrollSize,
      };
      scroll = (
        <div className={scrollClass} style={scrollStyle}
          onMouseDown={this._handleScrollMouseDown}
          onWheel={this._handleScrollWheel}
        />
      );
    }

    const innerStyle = {
      marginRight: -(PADDING_RIGHT + SCROLL_WIDTH),
      maxHeight: this.props.maxHeight,
      paddingRight: PADDING_RIGHT,
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

    events.addEventListener(this._inner, 'scroll', this._reflow);
  }

  componentDidUpdate() {
    this._reflow();
  }

  componentWillUnmount() {
    events.removeEventListener(this._inner, 'scroll', this._reflow);
  }

  _refInner = (el) => {
    this._inner = el;
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
      const scrollSize = containerHeight / contentHeight * containerHeight;
      const scrollPos = scrollTop / (contentHeight - containerHeight) *
        (containerHeight - scrollSize);

      if (state.scrollSize !== scrollSize || state.scrollPos !== scrollPos) {
        this.setState({
          scrollActive: true,
          scrollSize,
          scrollPos,
        });
      }
    } else {
      this.setState({scrollActive: false});
    }
  };

  _handleScrollMouseDown = (event) => {
    const target = global.document;
    const initialY = event.clientY;
    const initialScrollTop = this._inner.scrollTop;

    const mouseMove = (event) => {
      const ratio = (this._inner.scrollHeight - this._inner.offsetHeight) /
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
      this.setState({scrolling: false});
    };

    events.addEventListener(target, 'mousemove', mouseMove);
    events.addEventListener(target, 'mouseup', mouseUp);
    this.setState({scrolling: true});

    event.preventDefault();
  };

  _handleScrollWheel = (event) => {
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
    const right = event.currentTarget.getBoundingClientRect().right -
      event.pageX;
    this._setHover(right <= 12);
  };

  _handleMouseLeave = event => {
    this._setHover(false);
  };

  _setHover(hover) {
    if (this.state.hover !== hover) {
      this.setState({hover});
    }
  }
}

ScrollContainer.propTypes = {
  invert: PropTypes.bool,
  maxHeight: PropTypes.number,
};

function measureScrollWidth() {
  if (!ExecutionEnvironment.canUseDOM) {
    return 0;
  }

  const div = document.createElement('div');
  div.innerHTML = 'a'; // In IE clientWidth is 0 if this div is empty.
  div.style.overflowY = 'scroll';
  document.body.appendChild(div);
  const ret = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  // At least in jest it's NaN.
  return ret || 0;
}
