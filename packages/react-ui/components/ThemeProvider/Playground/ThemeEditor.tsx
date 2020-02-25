import React from 'react';

import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Theme } from '../../../lib/theming/Theme';
import { Gapped } from '../../Gapped';
import { Loader } from '../../Loader';

import { VariableValue } from './VariableValue';
import { VARIABLES_GROUPS } from './constants';
import { PlaygroundTheme, ThemeErrorsType } from './ThemeProviderPlayground';
import { jsStyles } from './Playground.styles';

interface ThemeEditorProps {
  editingTheme: Theme;
  currentTheme: PlaygroundTheme;
  currentErrors: ThemeErrorsType;
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
interface ThemeEditorState {
  groups: Group[];
  isLoading: boolean;
}
interface Group {
  title: string;
  prefix: string;
  isCommon?: boolean;
}
export class ThemeEditor extends React.Component<ThemeEditorProps, ThemeEditorState> {
  public state = {
    groups: [],
    isLoading: true,
  };
  private updateTimeout?: number;

  public render() {
    return this.state.isLoading ? (
      <div className={jsStyles.loaderWrapper()}>
        <Loader type="big" active className={jsStyles.loader()} />
      </div>
    ) : (
      this.renderGroups()
    );
  }

  public componentDidMount() {
    this.updateTimeout = window.setTimeout(() => {
      this.setState({ groups: VARIABLES_GROUPS, isLoading: false });
    }, 500);
  }

  public componentWillUnmount(): void {
    clearTimeout(this.updateTimeout);
  }

  private renderGroups = () => {
    const { editingTheme, currentTheme, currentErrors, onValueChange } = this.props;
    const keys = ThemeFactory.getKeys(editingTheme);

    return (
      <Gapped wrap verticalAlign="middle">
        {this.state.groups.map((i: Group) => (
          <Group
            editingTheme={editingTheme}
            currentTheme={currentTheme}
            currentErrors={currentErrors}
            onValueChange={onValueChange}
            title={i.title}
            variables={keys.filter(
              i.isCommon
                ? isCommonVariable.bind(null, this.state.groups.reduce(prefixesReducer, []))
                : isGroupVariable.bind(null, i.prefix),
            )}
            key={i.title}
          />
        ))}
      </Gapped>
    );
  };
}

interface GroupProps {
  editingTheme: Theme;
  currentTheme: PlaygroundTheme;
  currentErrors: ThemeErrorsType;
  title: string;
  variables: string[];
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
const Group = (props: GroupProps) => {
  const { editingTheme, currentTheme, currentErrors, onValueChange, title, variables } = props;

  return variables.length > 0 ? (
    <React.Fragment>
      <h2 className={jsStyles.editorGroupHeader(currentTheme)}>{title}</h2>
      <Gapped gap={16} wrap verticalAlign="middle">
        {variables.map(variable => {
          const value = editingTheme[variable as keyof Theme];
          const isError = currentErrors[variable];
          return (
            <VariableValue
              theme={currentTheme}
              onChange={onValueChange}
              value={value}
              isError={isError || false}
              variable={variable}
              key={variable}
              baseVariables={getBaseVariables(editingTheme, variable)}
            />
          );
        })}
      </Gapped>
    </React.Fragment>
  ) : null;
};

const isGroupVariable = (prefix: string, name: string) => {
  const splitPrefix = prefix.split(' ') || [];

  for (const item of splitPrefix) {
    if (name.startsWith(item.trim())) {
      return true;
    }
  }
  return false;
};
const isCommonVariable = (prefixes: string[], name: string) => {
  for (const item of prefixes) {
    if (name.startsWith(item.trim())) {
      return false;
    }
  }
  return true;
};
const prefixesReducer = (acc: string[], current: { title: string; prefix: string }): string[] => {
  const splitPrefix = current.prefix.split(' ');
  return [...acc, ...splitPrefix];
};
const getBaseVariables = (theme: Theme, variable: keyof Theme): Array<keyof Theme> => {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (Object.prototype.hasOwnProperty.call(theme, variable)) {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variable);

      if (descriptor && typeof descriptor.get !== 'undefined') {
        const getterBody = descriptor.get.toString();
        const variableNameMatchArray = getterBody.match(/this\.(\w+)\b/gm) || [];
        return (variableNameMatchArray || []).map(v => v.replace(/this\./g, ''));
      }
      break;
    }
  }
  return [];
};
