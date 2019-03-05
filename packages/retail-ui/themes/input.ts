import { CommonTheme } from '.';
import { getThemeColor, ThemeStyles } from './utils';
import { getCommonTheme } from './common';

export interface InputStateStyles {
  color?: string;
  background?: string;
  border?: string;
  'box-shadow'?: string;
  'border-top-color'?: string;
}

export type InputState = 'default' | 'focus' | 'warning' | 'error' | 'disabled';
const INPUT_STATES: InputState[] = ['default', 'focus', 'warning', 'error', 'disabled'];

export const getInputTheme = (base: CommonTheme = getCommonTheme()): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);
  const inputStyles = base.components.input.default;

  const stateStyles: ThemeStyles<InputState, InputStateStyles> = {};

  INPUT_STATES.forEach(state => {
    stateStyles[state] = {
      color: getColor(inputStyles[state].text),
      background: getColor(inputStyles[state].background),
      border: getColor(inputStyles[state].border),
      'box-shadow': getColor(inputStyles[state].shadow),
      'border-top-color': getColor(inputStyles[state].borderTopColor),
    };
  });

  return {
    ...stateStyles,
    padding: '10px',
    iconWidth: '27px',
    small: {
      fontSize: '14px',
      lineHeight: '20px',
      paddingTop: '6px',
      paddingBottom: '6px',
      height: '34px'
    },
    medium: {
      fontSize: '16px',
      lineHeight: '20px',
      paddingTop: '8px',
      paddingBottom: '8px',
      height: '40px'
    },
    large: {
      fontSize: '16px',
      lineHeight: '22px',
      paddingTop: '10px',
      paddingBottom: '10px',
      height: '44px'
    },
  };
};
