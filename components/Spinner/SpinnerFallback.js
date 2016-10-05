import React, {PropTypes} from 'react';
import {types, sizeMaps} from './settings';

require('./fallbackSpinner.css');

export default class SpinnerFallback extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),
  };

  state = {
    frame: 0,
  };

  _mounted = false;

  _framesCount = {
    [types.mini]: 180,
    [types.normal]: 60,
    [types.big]: 60,
  };


  componentDidMount() {
    this._mounted = true;
    this.animate();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  animate = () => {
    if (!this._mounted) {
      return;
    }

    const {frame} = this.state;
    const {type} = this.props;
    const framesCount = this._framesCount[type];
    const nextFrame = frame < framesCount ? frame + 1 : 0;
    this.setState({frame: nextFrame});

    setTimeout(this.animate, 1000 / 25);
  };

  render() {
    const {type} = this.props;
    const {frame} = this.state;
    const size = sizeMaps[type];

    const cssSet = {
      backgroundPosition: `0 -${frame*size.height}px`,
      width: size.width,
      height: size.height,
      display: 'inline-block',
      height: size.height,
      position: 'relative',
      top: type === 'mini' ? 2 : 0,
      width: size.width,
    };

    return (
      <span className={"spinner-fallback-" + type} style={cssSet}/>
    );
  }
}
