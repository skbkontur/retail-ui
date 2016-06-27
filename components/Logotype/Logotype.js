import React, {PropTypes} from 'react';

import styles from './Logotype.less';
import cloudImage from './cloud.png';
import '../ensureOldIEClassName';

const hasSVGSupport = () => 'SVGSVGElement' in window;

/* eslint-disable max-len */
const createCloud = color => (
  <svg width="25px" height="19px" viewBox="9 0 25 19" className={styles.cloud}>
    <path
      fill={color}
      d="M21.1744364,0.854871967 C17.8731636,0.854871967 15.0510424,2.9310477 13.9323455,5.85111464 C11.4838,6.7743113 9.73773939,9.14737406 9.73773939,11.9149305 C9.73773939,15.4958762 12.6410727,18.3976418 16.2103455,18.3976418 L26.8491333,18.3976418 C30.8488303,18.3976418 34.1054364,15.1440854 34.1054364,11.1401774 C34.1054364,7.29081339 31.1005879,4.13689707 27.3221939,3.88677992 C25.8908303,2.00785105 23.6554667,0.854871967 21.1744364,0.854871967 M21.1744364,2.60772552 C23.0646485,2.60772552 24.7985273,3.4617841 25.9314364,4.95028619 L26.4166788,5.58066276 L27.2064667,5.6376 C30.0955879,5.81857908 32.3573455,8.23637824 32.3573455,11.1401774 C32.3573455,14.1761523 29.888497,16.6549556 26.8491333,16.6549556 L16.2103455,16.6549556 C13.607497,16.6549556 11.4858303,14.5279431 11.4858303,11.9149305 C11.4858303,9.95872971 12.7202545,8.18350795 14.5475273,7.48806025 L15.2845273,7.20947448 L15.5687697,6.46929038 C16.4519515,4.15926527 18.7035576,2.60772552 21.1744364,2.60772552"
      id="Fill-8"
    />
  </svg>
);
/* eslint-enable max-len */

const createPngCloud = backgroundColor => (
  <div style={{backgroundColor}} className={styles.cloud}>
    <div
      style={{backgroundImage: `url('${cloudImage}')`}}
      className={styles.inner}
    />
  </div>
);

const Logotype = ({color = '#D92932', suffix}) => (
  <a href="/" tabIndex="-1" className={styles.root}>
    <span>к</span>
    <span style={{color}}>
      {hasSVGSupport()
        ? createCloud(color)
        : createPngCloud(color)
      }
    </span>
    <span>нтур.</span>
    <span style={{color}}>{suffix}</span>
  </a>
);

Logotype.propTypes = {
  /**
   * Цвет логотипа в rgb, rgba, hex
   */
  color: PropTypes.string,

  /**
   * Суффикс сервиса
   */
  suffix: PropTypes.string.isRequired,
};

export default Logotype;
