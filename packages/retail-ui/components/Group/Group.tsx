import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import Corners from '../Button/Corners';

import '../ensureOldIEClassName';
import styles from './Group.less';
import { Nullable } from '../../typings/utility-types';
import { isButton } from '../Button';

export interface GroupProps {
  width?: React.CSSProperties['width'];
}

export interface GroupChildProps {
  /** @deprecated */
  mainInGroup?: boolean;
  width?: React.CSSProperties['width'];
  corners?: number;
}

/**
 * Главному *Input*, который должен занимать всю доступную ширину, нужно
 * передать свойство `mainInGroup`;
 */
class Group extends React.Component<GroupProps> {
  public static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  public render() {
    const style: React.CSSProperties = {
      width: this.props.width,
    };

    let first: Nullable<React.ReactElement<any>> = null;
    let last: Nullable<React.ReactElement<any>> = null;

    React.Children.forEach(this.props.children, child => {
      if (child && React.isValidElement(child)) {
        first = first || child;
        last = child;
      }
    });

    const rootCss = classNames(styles.root, { [styles.hasWidth]: this.props.width !== undefined });

    return (
      <span className={rootCss} style={style}>
        {React.Children.map(this.props.children, child => {
          if (!child || !React.isValidElement<GroupChildProps>(child)) {
            return null;
          }

          const childProps = child.props;

          const wrapCss = classNames({
            [styles.wrap]: true,
            [styles.fixed]: !childProps.mainInGroup,
            [styles.stretch]: childProps.mainInGroup,
          });
          const itemCss = classNames({
            [styles.item]: true,
            [styles.itemFirst]: child === first,
          });

          let corners = 0;
          if (child !== first) {
            corners |= Corners.TOP_LEFT | Corners.BOTTOM_LEFT;
          }
          if (child !== last) {
            corners |= Corners.TOP_RIGHT | Corners.BOTTOM_RIGHT;
          }
          let width = childProps.width;
          if (childProps.mainInGroup) {
            width = '100%';
          }

          const cloneProps = {
            width,
            corners,
          };

          if (!isButton(child)) {
            delete cloneProps.corners;
          }

          child = React.cloneElement(child, cloneProps);

          return (
            <div className={wrapCss}>
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </span>
    );
  }
}

export default Group;
