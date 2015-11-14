import classnames from 'classnames';
import {Component, PropTypes} from 'react';
import styles from "./Spinner.less";
import {types, sizeMaps} from "./settings";

/**
 * DRAFT - инлайн-лоадер
 */
class Spinner extends Component {
  renderCloud() {
    const {type} = this.props;
    const params = sizeMaps[type];

    const svgPath = `M32.0297086,9.1495774 L31.5978628,8.5870774 C29.3570968,
      5.67148577 25.9305165,4 22.1999329,4 C17.3429265,
      4 12.9026663,7.04270463 11.154144,11.5717304 L10.901479,
      12.2253114 L10.2421341,12.4725311 C6.50853057,13.8727758 4,
      17.4719751 4,21.428492 C4,26.7061833 8.32047079,
      31 13.6314689,31 L32.0297086,31 C38.078569,31 43,26.1036477 43,
      20.0862989 C43,14.3602091 38.493302,9.5769573 32.7403918,
      9.19661922 L32.0297086,9.1495774 Z`;

    return (
      <svg className={styles.cloud}
           width={params.width}
           height={params.height}
           viewBox={params.viewBox}>
        <path className={styles.bg}
              strokeWidth={params.strokeWidth}
              d={svgPath}></path>
        <path className={styles.path}
              strokeWidth={params.strokeWidth}
              d={svgPath}></path>
      </svg>
    );
  }

  renderCircle() {
    const {type} = this.props;
    const params = sizeMaps[type];

    return (
      <svg className={styles.circle}
           width={params.width}
           height={params.height}>

        <circle cx="8" cy="8" r="6" stroke-miterlimit="10"
                className="path"
                strokeWidth={params.strokeWidth} />
      </svg>
    );
  }

  render() {
    const {type} = this.props;

    return (
      <div className={styles.spinner}>
        {type === types.mini ? this.renderCircle() : this.renderCloud()}
        {type === types.mini ?
          <span className={styles.caption}>{this.props.caption}</span>
          : null}
      </div>
    )
  }
}

Spinner.propTypes = {
  /**
   * Тип спиннера: mini, normal, big
   *
   * Значение по-умолчанию - normal
   *
   * Spinner.types - все доступные типы
   */
  type: PropTypes.oneOf(Object.values(types)),

  /**
   * Текст рядом с мини-лоадером.
   *
   * "Загрузка" - значение по-умолчанию
   */
  caption: PropTypes.string,
};

Spinner.defaultProps = {
  type: types.normal,
  caption: "Загрузка",
};

Spinner.types = types;

export default Spinner;
