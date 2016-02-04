import React, {PropTypes} from 'react';

import {types, sizeMaps} from './settings';

import fallbackImage_mini from './fallback_circle.png';
import fallbackImage_big from './fallback_cloud_big.png';
import fallbackImage_normal from './fallback_cloud_normal.png';

class SpinnerFallback extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),
  };

  _updateDelay = 1000 / 25;
  _timer = null;

  _framesCount = {
    [types.mini]: 180,
    [types.normal]: 60,
    [types.big]: 60,
  };

  _imageUrls = {
    [types.mini]: fallbackImage_mini,
    [types.normal]: fallbackImage_normal,
    [types.big]: fallbackImage_big,
  };

  constructor(props) {
    super(props);
    this.state = {frame: 0};
  }

  componentWillUnmount() {
    this.killTimer();
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    this.killTimer();
    this.setTimer();
  }

  killTimer() {
    clearTimeout(this._timer);
  }

  setTimer() {
    this._timer = setTimeout(() => this.shiftBg(), this._updateDelay);
  }

  shiftBg() {
    const {frame} = this.state;
    const {type} = this.props;
    const framesCount = this._framesCount[type];
    const nextFrame = frame < framesCount ? frame + 1 : 0;
    this.setState({frame: nextFrame});
  }

  render() {
    const {type} = this.props;
    const {frame} = this.state;
    const size = sizeMaps[type];

    const cssSet = {
      backgroundPosition: `0 -${frame*size.height}px`,
      backgroundImage: `url('${this._imageUrls[type]}')`,
      width: size.width,
      height: size.height,
      display: 'inline-block',
    };

    return (
      <span style={cssSet} />
    );
  }
}

SpinnerFallback.propTypes = {};
export default SpinnerFallback;
