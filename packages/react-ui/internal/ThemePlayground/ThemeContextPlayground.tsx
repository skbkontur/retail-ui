import type { ReactNode } from 'react';
import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { SidePage } from '../../components/SidePage';
import { Gapped } from '../../components/Gapped';
import { ComboBox } from '../../components/ComboBox';
import { Link } from '../../components/Link';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import type { Writeable } from '../../typings/utility-types';
import { findPropertyDescriptor } from '../../lib/theming/ThemeHelpers';
import { LIGHT_THEME } from '../../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../../lib/theming/themes/DarkTheme';

import { ThemeEditor } from './ThemeEditor';
import { styles } from './Playground.styles';
import { Playground } from './Playground';
import { ThemeType } from './constants';

interface PlaygroundState {
  editorOpened: boolean;
  editingThemeItem?: EditingThemeItem;
  themes: Themes;
  themesErrors: ThemesErrors;
  currentTheme: Theme;
  currentThemeType: ThemeType;
}
interface Themes {
  lightTheme: Theme;
  darkTheme: Theme;
}
interface ThemesErrors {
  lightTheme: ThemeErrorsType;
  darkTheme: ThemeErrorsType;
}
interface EditingThemeItem {
  value: ThemeType;
  label: string;
}
interface PlaygroundProps {
  children?: ReactNode;
}
export type ThemeErrorsType = Writeable<{ [key in keyof Theme]?: boolean }>;

const getEditingThemeType = (editingThemeItem: PlaygroundState['editingThemeItem']) => {
  if (editingThemeItem) {
    return editingThemeItem.value;
  }

  return 'lightTheme';
};
export class ThemeContextPlayground extends React.Component<PlaygroundProps, PlaygroundState> {
  private readonly editableThemesItems = [
    { value: ThemeType.LightTheme, label: 'Светлая тема' },
    { value: ThemeType.DarkTheme, label: 'Тёмная тема' },
  ];

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      currentTheme: LIGHT_THEME,
      currentThemeType: ThemeType.LightTheme,
      editorOpened: false,
      themes: {
        lightTheme: LIGHT_THEME,
        darkTheme: DARK_THEME,
      },
      themesErrors: {
        lightTheme: {},
        darkTheme: {},
      },
    };
  }

  public render() {
    const { currentTheme, editorOpened, currentThemeType } = this.state;
    return (
      <ThemeContext.Provider value={currentTheme}>
        {editorOpened && this.renderSidePage()}
        {
          <Playground
            onThemeChange={this.handleThemeChange}
            currentThemeType={currentThemeType}
            onEditLinkClick={this.handleOpen}
          />
        }
      </ThemeContext.Provider>
    );
  }

  private renderSidePage = () => {
    const { currentTheme, themesErrors, editingThemeItem, themes } = this.state;

    const editingThemeType = getEditingThemeType(editingThemeItem);
    const themeErrors = themesErrors[editingThemeType];

    return (
      <SidePage disableAnimations ignoreBackgroundClick blockBackground width={600} onClose={this.handleClose}>
        <SidePage.Header>
          <div className={styles.editorHeaderWrapper(currentTheme)}>
            <Gapped wrap verticalAlign="middle">
              <span>Тема для редактирования:</span>
              <ComboBox
                getItems={this.getEditableThemesItems}
                value={editingThemeItem}
                onValueChange={this.handleEditingThemeSwitch}
              />
            </Gapped>
          </div>
          <div style={{ fontSize: 14, marginTop: 8 }}>
            <Link onClick={this.handleGetTheme}>Вывести тему в консоль</Link>
          </div>
        </SidePage.Header>
        <SidePage.Body>
          <div className={styles.sidePageBody()}>
            <ThemeEditor
              editingTheme={themes[editingThemeType]}
              currentTheme={currentTheme}
              currentErrors={themeErrors}
              onValueChange={this.handleThemeVariableChange}
            />
          </div>
        </SidePage.Body>
      </SidePage>
    );
  };

  private handleGetTheme = () => {
    const currentTheme = this.state.currentTheme;
    const themeObject: Writeable<ThemeIn> = {};
    ThemeFactory.getKeys(currentTheme).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(currentTheme, key);
      if (descriptor && !descriptor.get && LIGHT_THEME[key] && currentTheme[key] !== LIGHT_THEME[key]) {
        themeObject[key] = currentTheme[key] as keyof Theme;
      }
    });

    console.log(JSON.stringify(themeObject));
  };

  private handleOpen = () => {
    this.setState((state) => ({
      editorOpened: true,
      editingThemeItem: this.editableThemesItems.find((i) => i.value === state.currentThemeType),
    }));
  };

  private handleClose = () => {
    this.setState({
      editorOpened: false,
    });
  };

  private handleThemeChange = (value: string) => {
    const themeType = value as ThemeType;
    this.setState({
      currentThemeType: themeType,
      currentTheme: this.state.themes[themeType],
    });
  };

  private handleThemeVariableChange = (variable: keyof Theme, value: string) => {
    const { editingThemeItem, currentTheme, themes, themesErrors } = this.state;
    const editingThemeType = getEditingThemeType(editingThemeItem);

    const theme = themes[editingThemeType];
    const currentValue = theme[variable] as string;

    let canSetVariable = true;
    if (ColorFunctions.isValid(currentValue)) {
      canSetVariable = ColorFunctions.isValid(value);
      themesErrors[editingThemeType][variable] = !canSetVariable;
    }

    const nextThemeErrors: ThemesErrors = { ...themesErrors };
    nextThemeErrors[editingThemeType][variable] = !canSetVariable;
    const stateUpdate = { themes, currentTheme, themesErrors: nextThemeErrors };

    if (canSetVariable) {
      const result = this.changeThemeVariable(theme, variable, value);
      stateUpdate.themes[editingThemeType] = result;
      if (this.state.currentThemeType === editingThemeType) {
        stateUpdate.currentTheme = result;
      }
    }

    this.setState(stateUpdate);
  };

  private getEditableThemesItems = (query: string) => {
    return Promise.resolve(this.editableThemesItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())));
  };

  private handleEditingThemeSwitch = (item: EditingThemeItem) => {
    this.setState({ editingThemeItem: item });
  };

  private changeThemeVariable = (theme: Theme, variableName: keyof Theme, variableValue: string): Theme => {
    const result: ThemeIn = {};
    ThemeFactory.getKeys(theme).forEach((key) => {
      const descriptor = findPropertyDescriptor(theme, key);
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if (key === variableName) {
        delete descriptor.get;
        delete descriptor.set;
        descriptor.value = variableValue;
      }
      Object.defineProperty(result, key, descriptor);
    });

    return ThemeFactory.create<ThemeIn>(result);
  };
}
