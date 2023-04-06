import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { ArrowTriangleUpDownIcon } from '../icons/16px';

import { DateSelectDataTids } from './DateSelect';
import { styles } from './DateSelect.styles';

interface DateSelectCaptionProps {
  caption?: React.ReactNode;
  width?: number | string;
  disabled?: boolean | null;
  onClick?: () => void;
  menu?: React.ReactNode;
}

export const DateSelectCaption = forwardRefAndName<HTMLLabelElement, DateSelectCaptionProps>(
  'DateSelectCaption',
  (props, ref) => {
    const theme = useContext(ThemeContext);
    const { caption, disabled, width, menu, onClick } = props;
    const rootProps = {
      className: cx({
        [styles.root(theme)]: true,
        [styles.disabled()]: Boolean(disabled),
      }),
      style: { width },
      ref,
    };
    return (
      <span {...rootProps}>
        <div data-tid={DateSelectDataTids.caption} className={styles.caption()} onClick={onClick}>
          {caption}
          <div
            className={cx({
              [styles.arrow(theme)]: true,
              [styles.arrowDisabled()]: Boolean(disabled),
            })}
          >
            <ArrowTriangleUpDownIcon size={12} />
          </div>
        </div>
        {menu}
      </span>
    );
  },
);
