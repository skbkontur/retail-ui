import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ZIndex } from '../../../internal/ZIndex';
import { Nullable } from '../../../typings/utility-types';
import { styles } from '../ToastView.styles';

import { ToastActionButton } from './ToastActionButton';
import { ToastCloseButton } from './ToastCloseButton';
import { useToast } from './ToastProvider';

type Action = {
  label: string;
  handler: () => void;
};

export type ToastItem = {
  action: Nullable<Action>;
  content: Nullable<string>;
  id: number;
};

export type ToastProps = {
  action?: Action | null;
  children: ToastItem['content'];
  id: ToastItem['id'];
};

export const Toast = ({ children, id, action }: ToastProps) => {
  const theme = useContext(ThemeContext);
  const { removeToast } = useToast();

  // If toast has an action button its time to disappear increases
  const timeout = action ? 7000 : 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast, timeout]);

  return (
    <ZIndex priority="Toast" className={styles.wrapper()}>
      <div data-tid="ToastView__root" className={styles.root(theme)}>
        <span>{children}</span>
        {action && <ToastActionButton action={action} />}
        {action && (
          <ToastCloseButton
            onClick={() => {
              removeToast(id);
            }}
          />
        )}
      </div>
    </ZIndex>
  );
};

Toast.propTypes = {
  action: propTypes.shape({
    label: propTypes.string.isRequired,
    handler: propTypes.func.isRequired,
  }),
  children: propTypes.string.isRequired,
  id: propTypes.number,
};
