import React, {PropTypes} from 'react';
import modernizr from './modernizr-inlinesvg';

//noinspection JSUnresolvedVariable
import styles from './Logotype.less';

const createCloudSVG = (color) => (
  <svg
    className={styles.cloud}
    id="cloud"
    x="0px"
    y="0px"
    viewBox="423.4 585.2 36 26"
  >
    <path
      fill={color}
      d="M440.3,587.8c2.8,0,5.4,1.3,7.1,3.5l0.7,1h1.2c4.3,0.3,7.6,3.8,7.6,8.1c0,4.5-3.6,8.1-8.2,8.1h-15.8 c-3.8,0-6.9-3.1-6.9-7c0-3,1.8-5.5,4.6-6.6l1.2-0.3l0.5-1.2C433.4,590.2,436.7,587.8,440.3,587.8 M440.3,585.2  c-4.9,0-9,3.1-10.7,7.5c-3.6,1.3-6.2,5-6.2,8.9c0,5.3,4.3,9.6,9.5,9.6h15.8c5.9,0,10.7-4.8,10.7-10.8c0-5.8-4.4-10.4-10-10.8  C447.4,587,444.1,585.2,440.3,585.2L440.3,585.2z"
    />
  </svg>
);

const createCloudVML = (color) => {
  document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
  const cloud = `
    <v:shape
      style="position: absolute;left: 0;bottom: -1px; width: 0.66px;height: 0.66px;z-index: 1;"
      coordsize="21600,21600" filled="t" fillcolor=${color} stroked="f"
      strokecolor="black" strokeweight="1pt"
      path=" m9510480,12696480 c9570960,12696480,9627120,12724560,9663840,12772080,9663840,12772080,9678960,12793680,9678960,12793680,9678960,12793680,9704880,12793680,9704880,12793680,9797760,12800160,9869040,12875760,9869040,12968640,9869040,13065840,9791280,13143600,9691920,13143600,9691920,13143600,9350640,13143600,9350640,13143600,9268560,13143600,9201600,13076640 9201600,12992400,9201600,12927600,9240480,12873600,9300960,12849840,9300960,12849840,9326880,12843360,9326880,12843360,9326880,12843360,9337680,12817440,9337680,12817440,9361440,12748320,9432720,12696480,9510480,12696480 m9510480,12640320 c9404640,12640320,9316080,12707280,9279360,12802320,9201600,12830400,9145440,12910320,9145440,12994560,9145440,13109040,9238320,13201920,9350640,13201920,9350640,13201920,9691920,13201920,9691920,13201920,9819360,13201920,9923040,13098240,9923040,12968640,9923040,12843360,9828000,12744000,9707040,12735360,9663840,12679200,9592560,12640320 9510480,12640320,9510480,12640320,9510480,12640320,9510480,12640320,9510480,12640320,9510480,12640320,9510480,12640320 e"
    >
      <v:stroke opacity=".75" miterlimit="8" />
      <v:skew on="t" matrix="1,0,0,1,0,0" offset="-424,-586" />
      <v:fill type="solid" />
    </v:shape>
  `;
  return <span
    style={{position: 'relative', width: 23, display: 'inline-block'}}
    dangerouslySetInnerHTML={{__html: cloud}}
  />;
};

//noinspection JSUnresolvedVariable
const createCloud = modernizr.inlinesvg ? createCloudSVG : createCloudVML;

const Logotype = ({color = '#D92932', suffix}) => (
  <a href="/" tabIndex="-1" className={styles.root}>
    <span>к</span>
    <span style={{color}}>{createCloud(color)}</span>
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

module.exports = Logotype;
