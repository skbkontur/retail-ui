import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { isIE11, isEdge } from '../../lib/client';
import { Corners } from '../Button/Corners';
import { Nullable } from '../../typings/utility-types';
import { isButton } from '../Button';
import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

import { jsStyles } from './Group.styles';

export interface GroupProps extends CommonProps {
  width?: React.CSSProperties['width'];
}

interface GroupChildProps {
  width?: React.CSSProperties['width'];
  corners?: number;
}

export class Group extends React.Component<GroupProps> {
  public static __KONTUR_REACT_UI__ = 'Group';

  public static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  public render() {
    const [{ className, style, ...commonProps }] = extractCommonProps(this.props);

    const wrapProps = {
      ...commonProps,
      className: cn(className, jsStyles.root()),
      style: {
        ...style,
        width: this.props.width ?? style?.width,
      },
    };

    let first: Nullable<React.ReactElement<any>> = null;
    let last: Nullable<React.ReactElement<any>> = null;

    React.Children.forEach(this.props.children, child => {
      if (child && React.isValidElement(child)) {
        first = first || child;
        last = child;
      }
    });

    return (
      <span {...wrapProps}>
        {React.Children.map(this.props.children, child => {
          if (!child || !React.isValidElement<GroupChildProps>(child)) {
            return null;
          }

          const isWidthInPercent = Boolean(child.props.width && child.props.width.toString().includes('%'));
          const itemCss = cn({
            [jsStyles.item()]: true,
            [jsStyles.itemFirst()]: child === first,
          });

          let corners = 0;
          if (child !== first) {
            corners |= Corners.TOP_LEFT | Corners.BOTTOM_LEFT;
          }
          if (child !== last) {
            corners |= Corners.TOP_RIGHT | Corners.BOTTOM_RIGHT;
          }

          if (isButton(child)) {
            child = React.cloneElement(child, { corners });
          }

          return (
            <div
              className={cn({
                [jsStyles.fixed()]: !isWidthInPercent,
                [jsStyles.stretch()]: isWidthInPercent,
                [jsStyles.stretchFallback()]: Boolean(isWidthInPercent && this.props.width && (isIE11 || isEdge)),
              })}
            >
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </span>
    );
  }
}
