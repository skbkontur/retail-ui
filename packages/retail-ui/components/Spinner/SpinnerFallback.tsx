import * as React from 'react';
import * as PropTypes from 'prop-types';
import { types, sizeMaps } from './settings';
import fallbackImage_mini from './fallback_circle.png';
import fallbackImage_mini_dimmed from './fallback_circle_dimmed.png';
import fallbackImage_big from './fallback_cloud_big.png';
import fallbackImage_normal from './fallback_cloud_normal.png';
import { SpinnerType } from '.';

import styles from './Spinner.less';

export interface SpinnerFallbackProps {
  type: SpinnerType;
  dimmed?: boolean;
}

export default class SpinnerFallback extends React.Component<SpinnerFallbackProps> {
  public static propTypes = {
    type: PropTypes.oneOf(Object.keys(types)),

    dimmed: PropTypes.bool,
  };

  public state = {
    frame: 0,
  };

  private _mounted = false;

  private _framesCount = {
    [types.mini]: 180,
    [types.normal]: 60,
    [types.big]: 60,
    dimmed: 60,
  };

  private _imageUrls = {
    [types.mini]: fallbackImage_mini,
    [types.normal]: fallbackImage_normal,
    [types.big]: fallbackImage_big,
    dimmed: fallbackImage_mini_dimmed,
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
      backgroundImage: `url('${this._imageUrls[this.getSpriteSettingsKey()]}')`,
      height: size.height,
      top: type === 'mini' ? 2 : 0,
      width: size.width,
    };

    if (!process.env.enableReactTesting) {
      cssSet.backgroundPosition = `0 -${frame * size.height}px`;
    }

    return <span className={styles.fallback} style={cssSet} />;
  }

  private animate = () => {
    if (!this._mounted) {
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
