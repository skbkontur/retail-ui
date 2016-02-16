import React, {PropTypes} from 'react';
import cx from 'classnames';

import Center from 'ui/Center';
import Logotype from 'ui/Logotype';

import styles from './TopBar.less';

/**
 * __DRAFT__
 *
 * Шапка
 *
 * `Left({children: node})` – левая часть шапки
 *
 * `Right({children: node})` – правая часть шапки
 *
 * `Logo({suffix: string, color: string})` – логотип
 *
 * `Item({children: node, iconOnly: bool, className: string})`
 *  – статичный элемент шапки
 *
 * `ButtonItem({children: node, iconOnly: bool, onClick: func})`
 *  – кликабельный элемент шапки
 *
 * `Divider()` – разделитель
 *
 **/
const TopBar = ({children, maxWidth, noShadow, noMargin}) => (
  <div
    className={cx(styles.root, {
      [styles.noShadow]: noShadow,
      [styles.noMargin]: noMargin,
    })}
  >
    <div className={styles.center} style={{maxWidth}}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  </div>
);

TopBar.propTypes = {
  /**
   * Отключает тень
   **/
  noShadow: PropTypes.bool,

  /**
   * Отключает отступ снизу
   **/
  noMargin: PropTypes.bool,

  /**
   * Максимальная ширина контейнера в шапке
   * __(по умолчанию – 1166px)__
   **/
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  children: PropTypes.node,
};

TopBar.defaultProps = {
  maxWidth: 1166,
};


TopBar.Left = ({children}) =>
  <div className={styles.left}>{children}</div>;


TopBar.Right = ({children}) =>
  <div className={styles.right}>{children}</div>;


TopBar.Item = ({children, _onClick, className, iconOnly}) =>
  <div
    className={cx(styles.block, {
      [className]: className,
      [styles.iconOnly]: iconOnly,
    })}
    onClick={_onClick}
  >
    <Center>
      {children}
    </Center>
  </div>;


TopBar.Divider = () =>
  <span className={styles.divider} />;


TopBar.Logo = ({suffix, color}) =>
  <TopBar.Item>
    <Logotype suffix={suffix} color={color}/>
  </TopBar.Item>;


TopBar.ButtonItem = ({onClick, children, iconOnly}) =>
  <TopBar.Item className={styles.button} _onClick={onClick} iconOnly={iconOnly}>
    {children}
  </TopBar.Item>;

module.exports = TopBar;
