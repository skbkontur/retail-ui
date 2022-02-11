import React from 'react';

import { isNonNullable } from '../../lib/utils';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';
import { Gapped } from '../../components/Gapped';
import { Loader } from '../../components/Loader';

import { VariableValue } from './VariableValue';
import { VARIABLES_GROUPS, DEPRECATED_VARIABLES } from './constants';
import { ThemeErrorsType } from './ThemeContextPlayground';
import { styles } from './Playground.styles';

interface ThemeEditorProps {
  editingTheme: Theme;
  currentTheme: Theme;
  currentErrors: ThemeErrorsType;
  onValueChange: (variable: keyof Theme, value: string) => void;
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
      <div className={styles.loaderWrapper()}>
        <Loader type="big" active className={styles.loader()} />
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
    const keys = ThemeFactory.getKeys(editingTheme).filter((key) => !isDeprecatedVariable(key));

    return (
      <Gapped vertical>
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
        {DEPRECATED_VARIABLES.length > 0 ? (
          <Group
            editingTheme={editingTheme}
            currentTheme={currentTheme}
            currentErrors={currentErrors}
            onValueChange={onValueChange}
            title={'Deprecated Variables'}
            variables={DEPRECATED_VARIABLES}
          />
        ) : null}
      </Gapped>
    );
  };
}

interface GroupProps {
  editingTheme: Theme;
  currentTheme: Theme;
  currentErrors: ThemeErrorsType;
  title: string;
  variables: Array<keyof Theme>;
  onValueChange: (variable: keyof Theme, value: string) => void;
}
const Group = (props: GroupProps) => {
  const { editingTheme, currentTheme, currentErrors, onValueChange, title, variables } = props;

  return variables.length > 0 ? (
    <React.Fragment>
      <h2 className={styles.editorGroupHeader(currentTheme)}>{title}</h2>
      {variables.map((variable) => {
        const value = editingTheme[variable] as string;
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
            deprecated={isDeprecatedVariable(variable)}
          />
        );
      })}
    </React.Fragment>
  ) : null;
};

const isDeprecatedVariable = (name: keyof Theme) => {
  return DEPRECATED_VARIABLES.includes(name);
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
  for (; isNonNullable(theme); theme = Object.getPrototypeOf(theme)) {
    if (Object.prototype.hasOwnProperty.call(theme, variable)) {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variable);

      if (descriptor && typeof descriptor.get !== 'undefined') {
        const getterBody = descriptor.get.toString();
        const variableNameMatchArray = getterBody.match(/this\.(\w+)\b/gm) || [];
        return (variableNameMatchArray || []).map((v) => v.replace(/this\./g, '')) as Array<keyof Theme>;
      }
      break;
    }
  }
  return [];
};
