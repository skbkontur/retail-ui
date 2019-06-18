import * as React from 'react';
import { css } from '../../../lib/theming/Emotion';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { VariableValue } from './VariableValue';
import { ITheme } from '../../../lib/theming/Theme';
import Gapped from '../../Gapped';
import Loader from '../../Loader/Loader';
import styles from './styles.less';
import { VARIABLES_GROUPS } from './constants';
import {PlaygroundTheme, ThemeErrorsType} from "./ThemeProviderPlayground";

interface IThemeEditorProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
  currentErrors: ThemeErrorsType;
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
interface IThemeEditorState {
  groups: IGroup[];
  isLoading: boolean;
}
interface IGroup {
  title: string;
  prefix: string;
  isCommon?: boolean;
}
export class ThemeEditor extends React.Component<IThemeEditorProps, IThemeEditorState> {
  public state = {
    groups: [],
    isLoading: true,
  };
  private updateTimeout?: number;

  public render() {
    return this.state.isLoading ? (
      <div className={styles.loaderWrapper}>
        <Loader type="big" active className={styles.loader} />
      </div>
    ) : (
      this.renderGroups()
    );
  }

  public componentDidMount() {
    this.updateTimeout = setTimeout(() => {
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
      <Gapped verticalAlign={'middle'}>
        {this.state.groups.map((i: IGroup) => (
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

interface IGroupProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
  currentErrors: ThemeErrorsType;
  title: string;
  variables: string[];
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
const Group = (props: IGroupProps) => {
  const { editingTheme, currentTheme, currentErrors, onValueChange, title, variables } = props;
  const headerClassname = css`
    color: ${currentTheme.textColorMain};
  `;

  return variables.length > 0 ? (
    <React.Fragment>
      <h2 className={headerClassname}>{title}</h2>
      <Gapped gap={16}>
        {variables.map(variable => {
          const value = editingTheme[variable as keyof ITheme];
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
const getBaseVariables = (theme: ITheme, variable: keyof ITheme): Array<keyof ITheme> => {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (theme.hasOwnProperty(variable)) {
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
