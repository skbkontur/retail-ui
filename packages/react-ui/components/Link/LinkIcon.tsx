import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

import { LinkProps } from './Link';
import { styles } from './Link.styles';

export type LinkIconProps = {
  loading: LinkProps['loading'];
  icon: LinkProps['icon'];
};

export const LinkIcon = ({ loading, icon }: LinkIconProps) => {
  const theme = useContext(ThemeContext);

  const content = loading ? <Spinner caption={null} dimmed type="mini" /> : icon;

  return <span className={styles.icon(theme)}>{content}</span>;
};
