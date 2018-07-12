import { CommonTheme } from '.';
import { getThemeColor, ThemeStyles } from '../utils';
import { getCommonTheme } from './common';

export interface CheckboxStateStyles {
  color?: string;
  background?: string;
  'box-shadow'?: string;
  border?: string;
}

export type CheckboxType = 'checked' | 'unchecked';
const CHECKBOX_TYPES: CheckboxType[] = ['checked', 'unchecked'];

export type CheckboxState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
const CHECKBOX_STATES: CheckboxState[] = ['default', 'hover', 'active', 'focus', 'disabled'];

export const getCheckboxTheme = (base: CommonTheme = getCommonTheme()): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);
  const checkBoxStyles = base.components.checkbox;

  const stylesForType: Record<CheckboxType, ThemeStyles<CheckboxState, CheckboxStateStyles>> = {
    checked: {},
    unchecked: {}
  };

  CHECKBOX_TYPES.forEach(type => {
    CHECKBOX_STATES.forEach(state => {
      stylesForType[type][state] = {
        color: getColor(checkBoxStyles[type][state].text),
        background: getColor(checkBoxStyles[type][state].background),
        'box-shadow': getColor(checkBoxStyles[type][state].shadow),
        border: getColor(checkBoxStyles[type][state].border)
      };
    });
  });

  return {
    ...stylesForType,
    box: {
      size: '16px',
      background: `
        linear-gradient(
          #fdfdfd,
          #ededed
        )
      `,
      shadow: `
        0 1px 0 0 rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(0, 0, 0, 0.15)
      `,
      hoverBackground: `
        linear-gradient(
          -180deg,
          #f2f2f2 0,
          #dfdfdf 100%
        )
      `,
      hoverShadow: `
        0 1px 0 0 rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(0, 0, 0, 0.15)
      `,
      activeBackground: `#e1e1e1`,
      activeShadow: `
        0 -1px 0 0 rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.2),
        inset 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      `,
      disabledBackground: `#f2f2f2`,
      disabledShadow: `
        0 0 0 1px rgba(0, 0, 0, 0.15)
      `,
      borderRadius: '2px'
    }
  };
};
