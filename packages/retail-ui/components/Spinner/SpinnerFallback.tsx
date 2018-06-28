import React from 'react';

import PropTypes from 'prop-types';

import { types, sizeMaps } from './settings';

import fallbackImage_mini from './fallback_circle.png';
import fallbackImage_big from './fallback_cloud_big.png';
import fallbackImage_normal from './fallback_cloud_normal.png';
import { SpinnerType } from '.';

export interface SpinnerFallbackProps {
  type: SpinnerType;
}

export default class SpinnerFallback extends React.Component<
  SpinnerFallbackProps
> {
  public static propTypes = {
    type: PropTypes.oneOf(Object.keys(types))
  };

  public state = {
    frame: 0
  };

  private _mounted = false;

  private _framesCount = {
    [types.mini]: 180,
    [types.normal]: 60,
    [types.big]: 60
  };

  private _imageUrls = {
    [types.mini]: fallbackImage_mini,
    [types.normal]: fallbackImage_normal,
    [types.big]: fallbackImage_big
  };

  public componentDidMount() {
    this._mounted = true;
    this.animate();
  }

  public componentWillUnmount() {
    this._mounted = false;
  }

  public render() {
    const { type } = this.props;
    const { frame } = this.state;
    const size = sizeMaps[type];

    const cssSet: React.CSSProperties = {
      backgroundPosition: `0 -${frame * size.height}px`,
      backgroundImage: `url('${this._imageUrls[type]}')`,
      display: 'inline-block',
      height: size.height,
      position: 'relative',
      top: type === 'mini' ? 2 : 0,
      width: size.width
    };

    return <span style={cssSet} />;
  }

  private animate = () => {
    if (!this._mounted) {
      return;
    }

    const { frame } = this.state;
    const { type } = this.props;
    const framesCount = this._framesCount[type];
    const nextFrame = frame < framesCount ? frame + 1 : 0;
    this.setState({ frame: nextFrame });

    setTimeout(this.animate, 1000 / 25);
  };
}
