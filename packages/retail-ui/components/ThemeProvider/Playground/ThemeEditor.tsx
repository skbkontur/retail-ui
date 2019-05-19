import * as React from 'react';
import { css } from 'emotion';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { VariableValue } from './VariableValue';
import { ITheme } from '../../../lib/theming/Theme';
import Gapped from '../../Gapped';
import { PlaygroundTheme } from '../__stories__/ThemeProvider.stories';

interface IThemeEditorProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
export const ThemeEditor = (props: IThemeEditorProps) => {
  const { editingTheme, currentTheme, onValueChange } = props;
  const keys = ThemeFactory.getKeys(editingTheme);
  return (
    <Gapped verticalAlign={'middle'}>
      {renderGroups({
        currentTheme,
        editingTheme,
        onValueChange,
        variables: keys,
      })}
    </Gapped>
  );
};

interface IVariableValuesGroupProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
  title: string;
  variables: string[];
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
const VariableValuesGroup = (props: IVariableValuesGroupProps) => {
  const { editingTheme, currentTheme, onValueChange, title, variables } = props;

  return variables.length > 0 ? (
    <>
      <h2
        className={css`
          color: ${currentTheme.textColorMain};
        `}
      >
        {title}
      </h2>
      <Gapped>
        {variables.map(variable => {
          return (
            <VariableValue
              theme={currentTheme}
              onChange={onValueChange}
              value={editingTheme[variable as keyof ITheme]}
              variable={variable}
              key={variable}
              baseVariable={getBaseVariable(editingTheme, variable)}
            />
          );
        })}
      </Gapped>
    </>
  ) : null;
};

interface IVariablesGroupProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
  variables: string[];
}
const renderGroups = (props: IVariablesGroupProps) => {
  const { editingTheme, currentTheme, onValueChange, variables } = props;
  const groups = [
    { title: 'Common', nameStart: 'null', isCommon: true },
    { title: 'Button', nameStart: 'btn' },
    { title: 'Border', nameStart: 'border' },
    { title: 'Checkbox', nameStart: 'chb' },
    { title: 'DatePicker', nameStart: 'date calendar picker' },
    { title: 'Dropdown', nameStart: 'dropdown' },
    { title: 'Input', nameStart: 'input' },
    { title: 'Link', nameStart: 'link' },
    { title: 'Loader', nameStart: 'loader' },
    { title: 'Menu', nameStart: 'menu' },
    { title: 'Modal', nameStart: 'modal' },
    { title: 'Paging', nameStart: 'paging' },
    { title: 'Popup', nameStart: 'popup' },
    { title: 'Radio', nameStart: 'radio' },
    { title: 'SidePage', nameStart: 'sidePage' },
    { title: 'Tabs', nameStart: 'tab' },
    { title: 'Textarea', nameStart: 'textarea' },
    { title: 'Toast', nameStart: 'toast' },
    { title: 'Toggle', nameStart: 'toggle' },
    { title: 'Tooltip', nameStart: 'tooltip' },
    { title: 'Token', nameStart: 'token' },
  ];

  return groups.map(i => (
    <VariableValuesGroup
      editingTheme={editingTheme}
      currentTheme={currentTheme}
      onValueChange={onValueChange}
      title={i.title}
      variables={variables.filter(
        i.isCommon
          ? isCommonVariable.bind(null, groups.reduce(nameStartsReducer, []))
          : isGroupVariable.bind(null, i.nameStart),
      )}
      key={i.title}
    />
  ));
};

const isGroupVariable = (nameStart: string, name: string) => {
  const split = nameStart.split(' ') || [];

  for (const start of split) {
    if (name.startsWith(start.trim())) {
      return true;
    }
  }
  return false;
};
const isCommonVariable = (nameStarts: string[], name: string) => {
  for (const start of nameStarts) {
    if (name.startsWith(start.trim())) {
      return false;
    }
  }
  return true;
};
const nameStartsReducer = (acc: string[], current: { title: string; nameStart: string }): string[] => {
  const splitNameStart = current.nameStart.split(' ');
  return [...acc, ...splitNameStart];
};
const getBaseVariable = (theme: ITheme, variable: keyof ITheme): keyof ITheme => {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (theme.hasOwnProperty(variable)) {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variable);

      if (descriptor && typeof descriptor.get !== 'undefined') {
        const stringifiedGetter = descriptor.get.toString();
        const variableNameMatchArray = stringifiedGetter.match(/(\.\w+;)/gm) || [];
        return (variableNameMatchArray[0] || '').replace(/\W+/g, '');
      }
      break;
    }
  }
  return '';
};
