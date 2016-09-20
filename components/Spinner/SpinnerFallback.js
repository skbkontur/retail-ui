import React, {PropTypes} from 'react';
import {types, sizeMaps} from './settings';
import styles from './Spinner.less';

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
      width: size.width,
      height: size.height,
      display: 'inline-block',
    };

    return (
      <span className={styles["spinner-fallback-" + type]} style={cssSet}/>
    );
  }
}

SpinnerFallback.propTypes = {};
export default SpinnerFallback;
