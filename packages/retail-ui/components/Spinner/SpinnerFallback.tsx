import React from 'react';
import PropTypes from 'prop-types';

import { SPINNER_CLOUD_SIZE } from '../internal/icons/SpinnerIcon';

import fallbackImage_mini from './fallback_circle.png';
import fallbackImage_mini_dimmed from './fallback_circle_dimmed.png';
import fallbackImage_big from './fallback_cloud_big.png';
import fallbackImage_normal from './fallback_cloud_normal.png';
import styles from './Spinner.module.less';
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
    [types.mini]: 180,
    [types.normal]: 60,
    [types.big]: 60,
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
    return this.props.type === 'mini' ? this.renderCircle() : this.renderCloud();
  }

  private renderCircle() {
    const { dimmed } = this.props;
    const { frame } = this.state;

    const cssSet: React.CSSProperties = {
      backgroundImage: `url('${this.imageUrls[dimmed ? 'dimmed' : 'mini']}')`,
      height: 16,
      width: 16,
      marginBottom: -3,
      marginLeft: -1,
      marginRight: -1,
    };

    if (!process.env.enableReactTesting) {
      cssSet.backgroundPosition = `0 -${frame * 16}px`;
    }

    return <span className={styles.fallback} style={cssSet} />;
  }

  private renderCloud() {
    const { type } = this.props;
    const { frame } = this.state;
    const multiply = type === 'big' ? 2 : 1;
    const cssSet: React.CSSProperties = {
      backgroundImage: `url('${this.imageUrls[type]}')`,
      height: SPINNER_CLOUD_SIZE.height * multiply,
      top: 0,
      width: SPINNER_CLOUD_SIZE.width * multiply,
    };

    if (!process.env.enableReactTesting) {
      cssSet.backgroundPosition = `0 -${frame * SPINNER_CLOUD_SIZE.height * multiply}px`;
    }

    return <span className={styles.fallback} style={cssSet} />;
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
