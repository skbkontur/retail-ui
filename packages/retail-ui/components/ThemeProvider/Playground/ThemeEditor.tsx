import * as React from 'react';
import { css } from 'emotion';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { VariableValue } from './VariableValue';
import { ITheme } from '../../../lib/theming/Theme';
import Gapped from '../../Gapped';
import { PlaygroundTheme } from '../__stories__/ThemeProvider.stories';
import Loader from '../../Loader/Loader';
import styles from './styles.less';
import { VARIABLES_GROUPS } from './constants';

interface IThemeEditorProps {
  editingTheme: ITheme;
  currentTheme: PlaygroundTheme;
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
    setTimeout(() => {
      this.setState({ groups: VARIABLES_GROUPS, isLoading: false });
    }, 500);
  }

  private renderGroups = () => {
    const { editingTheme, currentTheme, onValueChange } = this.props;
    const keys = ThemeFactory.getKeys(editingTheme);

    return (
      <Gapped verticalAlign={'middle'}>
        {this.state.groups.map((i: IGroup) => (
          <Group
            editingTheme={editingTheme}
            currentTheme={currentTheme}
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
  title: string;
  variables: string[];
  onValueChange: (variable: keyof PlaygroundTheme, value: string) => void;
}
const Group = (props: IGroupProps) => {
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
