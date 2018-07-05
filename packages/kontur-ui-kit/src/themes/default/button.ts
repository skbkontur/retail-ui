import { CommonTheme } from '.';
import { ButtonUse } from '../../components/Button/Button';
import { CONTROL_STATES, ControlState, getThemeColor, ThemeStyles } from '../utils';
import { getCommonTheme } from './common';

export interface ButtonStateStyles {
  color?: string;
  background?: string;
  'box-shadow'?: string;
  border?: string;
}

export const getButtonTheme = (base: CommonTheme = getCommonTheme()): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);

  const useStales: Record<ButtonUse, ThemeStyles<ControlState, ButtonStateStyles>> = {
    default: {},
    success: {},
    primary: {},
    danger: {},
    pay: {}
  };

  (['default', 'success', 'primary', 'danger', 'pay'] as ButtonUse[]).forEach(use => {
    const buttonStyles = base.components.button[use];

    if (!buttonStyles) {
      return;
    }

    const stylesForState: ThemeStyles<ControlState, ButtonStateStyles> = {};

    CONTROL_STATES.forEach(state => {
      stylesForState[state] = {
        color: getColor(buttonStyles[state].text),
        background: getColor(buttonStyles[state].background),
        'box-shadow': getColor(buttonStyles[state].shadow),
        border: getColor(buttonStyles[state].border)
      };
    });

    useStales[use] = stylesForState;
  });

  return {
    ...useStales,
    small: {
      paddingHorizontal: '15px',
      height: '32px',
      fontSize: '14px',
      borderRadius: '2px'
    },
    medium: {
      paddingHorizontal: '15px',
      height: '38px',
      fontSize: '16px',
      borderRadius: '2px'
    },
    large: {
      paddingHorizontal: '20px',
      height: '42px',
      fontSize: '16px',
      borderRadius: '2px'
    }
  };
};
