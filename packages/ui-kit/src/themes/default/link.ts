import { CommonTheme } from '.';
import { LinkUse } from '../../components/Link/Link';
import { CONTROL_STATES, ControlState, getThemeColor, ThemeStyles } from '../utils';
import { getCommonTheme } from './common';

export interface LinkStateStyles {
  color?: string;
}

export const getLinkTheme = (base: CommonTheme = getCommonTheme()): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);

  const useStyles: Record<LinkUse, ThemeStyles<ControlState, LinkStateStyles>> = {
    default: {},
    success: {},
    danger: {},
    grayed: {}
  };

  (['default', 'success', 'danger', 'grayed'] as LinkUse[]).forEach(use => {
    const linkStyles = base.components.link[use];

    if (!linkStyles) {
      return;
    }

    const stateStyles: ThemeStyles<ControlState, LinkStateStyles> = {};

    CONTROL_STATES.forEach(state => {
      stateStyles[state] = {
        color: getColor(linkStyles[state].text)
      };
    });

    useStyles[use] = stateStyles;
  });

  return {
    ...useStyles,
    hoverTextDecoration: 'underline'
  };
};
