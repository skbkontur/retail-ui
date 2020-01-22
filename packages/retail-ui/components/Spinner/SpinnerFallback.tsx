import React from 'react';
import PropTypes from 'prop-types';

import fallbackImage_mini from './fallback_circle_mini.png';
import fallbackImage_mini_dimmed from './fallback_circle_dimmed.png';
import fallbackImage_big from './fallback_circle_big.png';
import fallbackImage_normal from './fallback_circle_normal.png';

import jsStyles from './Spinner.styles';
import { SpinnerType } from './Spinner';

export const types: {
  [key: string]: SpinnerType;
} = {
  big: 'big',
  mini: 'mini',
  normal: 'normal',
};

export interface SpinnerFallbackProps {
  type: SpinnerType;
  dimmed?: boolean;
}

export class SpinnerFallback extends React.Component<SpinnerFallbackProps> {
  public static __KONTUR_REACT_UI__ = 'SpinnerFallback';

  public static propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),

    dimmed: PropTypes.bool,
  };

  public state = {
    frame: 0,
  };

  private mounted = false;

  private _framesCount = {
    [types.mini]: 151,
    [types.normal]: 151,
    [types.big]: 151,
    dimmed: 60,
  };

  private imageUrls = {
    [types.mini]: fallbackImage_mini,
    [types.normal]: fallbackImage_normal,
    [types.big]: fallbackImage_big,
    dimmed: fallbackImage_mini_dimmed,
  };

  public componentDidMount() {
    this.mounted = true;
    this.animate();
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public render() {
    return this.renderCircle();
  }

  private renderCircle() {
    const { dimmed } = this.props;
    const { type } = this.props;
    const { frame } = this.state;
    const size = type === 'big' ? 96 : type === 'normal' ? 48 : 16;
    const backgroundImage = dimmed ? this.imageUrls.dimmed : this.imageUrls[type];

    const cssSet: React.CSSProperties = {
      backgroundImage: `url('${backgroundImage}')`,
      height: size,
      width: size,
      marginBottom: -3,
      marginLeft: -1,
      marginRight: -1,
    };

    if (!process.env.enableReactTesting) {
      cssSet.backgroundPosition = `0 -${frame * size}px`;
    }

    return <span className={jsStyles.fallback()} style={cssSet} />;
  }

  private animate = () => {
    if (!this.mounted) {
      return;
    }

    const { frame } = this.state;
    const framesCount = this._framesCount[this.getSpriteSettingsKey()];
    const nextFrame = frame < framesCount ? frame + 1 : 0;
    this.setState({ frame: nextFrame });

    setTimeout(this.animate, 1000 / 25);
  };

  private getSpriteSettingsKey = () =>
    this.props.type === types.mini && this.props.dimmed ? 'dimmed' : this.props.type;
}
