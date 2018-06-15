
import PropTypes from 'prop-types';
import * as React from 'react';

import styles from './Logotype.less';
import cloudImage from './cloud.png';

const hasSVGSupport = () => 'SVGSVGElement' in window;

/* eslint-disable max-len */
const createCloud = color => (
  <svg width="24" height="17" viewBox="0 0 24 17" className={styles.cloud}>
    <path
      fill={color}
      d="M10.7947842,0 C7.67880353,0 5.01508082,2.01193926 3.95917347,4.8416599 C1.64805866,5.73629303 0,8.0359337 0,10.7178625 C0,14.1880144 2.7403766,17 6.10931511,17 L16.1509748,17 C19.926179,17 23,13.8471079 23,9.9670801 C23,6.23681465 20.163806,3.18047989 16.5974838,2.93810131 C15.2464589,1.11730613 13.1365606,0 10.7947842,0 M10.8198444,2 C12.5405642,2 14.1189689,2.79038796 15.1502918,4.16792125 L15.5920233,4.75130284 L16.3109922,4.80399537 C18.9410506,4.97148234 21,7.20903301 21,9.89635206 C21,12.7059931 18.7525292,15 15.9857004,15 L6.30087549,15 C3.93142023,15 2,13.0315576 2,10.6133468 C2,8.80298205 3.12373541,7.16010423 4.78715953,6.51650261 L5.45807393,6.25868558 L5.71682879,5.57368269 C6.52081712,3.43587145 8.57052529,2 10.8198444,2"
    />
  </svg>
);
/* eslint-enable max-len */

// eslint-disable-next-line react/no-multi-comp
const createPngCloud = backgroundColor => (
  <div style={{ backgroundColor }} className={styles.cloud}>
    <div
      style={{ backgroundImage: `url('${cloudImage}')` }}
      className={styles.inner}
    />
  </div>
);

type Props = {
  color?: string,
  component: React.ComponentType<*> | string,
  href?: string,
  suffix?: string,
  textColor?: string
};

// eslint-disable-next-line react/no-multi-comp
const Logotype = ({
  color,
  textColor,
  component: Component,
  suffix,
  href
}: Props) => (
  <Component href={href} tabIndex="-1" className={styles.root}>
    <span style={{ color: textColor }}>к</span>
    <span style={{ color }}>
      {hasSVGSupport() ? createCloud(color) : createPngCloud(color)}
    </span>
    <span style={{ color: textColor }}>нтур{suffix && '.'}</span>
    {suffix && <span style={{ color }}>{suffix}</span>}
  </Component>
);

Logotype.defaultProps = {
  color: '#D92932',
  textColor: '#000',
  component: 'a',
  href: '/'
};

Logotype.propTypes = {
  /**
   * Цвет логотипа в rgb, rgba, hex
   */
  color: PropTypes.string,

  /**
   * Адрес ссылки
   */
  href: PropTypes.string,

  /**
   * Суффикс сервиса
   */
  suffix: PropTypes.string,

  /**
   * Цвет логотипа Контура в rgb, rgba, hex
   */
  textColor: PropTypes.string
};

export default Logotype;
