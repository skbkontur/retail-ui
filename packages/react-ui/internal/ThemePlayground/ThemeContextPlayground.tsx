import React, { ReactNode } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { FLAT_THEME_8PX_OLD } from '../../lib/theming/themes/FlatTheme8pxOld';
import { DEFAULT_THEME_8PX_OLD } from '../../lib/theming/themes/DefaultTheme8pxOld';
import { DEFAULT_THEME } from '../../lib/theming/themes/DefaultTheme';
import { DARK_THEME } from '../../lib/theming/themes/DarkTheme';
import { SidePage } from '../../components/SidePage';
import { Gapped } from '../../components/Gapped';
import { ComboBox } from '../../components/ComboBox';
import { Link } from '../../components/Link';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Writeable } from '../../typings/utility-types';
import { THEME_2022 } from '../../lib/theming/themes/Theme2022';
import { findPropertyDescriptor } from '../../lib/theming/ThemeHelpers';
import { THEME_2022_DARK } from '../../lib/theming/themes/Theme2022Dark';

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
  default: Theme;
  dark: Theme;
  defaultOld: Theme;
  flatOld: Theme;
  theme2022: Theme;
  theme2022Dark: Theme;
}
interface ThemesErrors {
  default: ThemeErrorsType;
  dark: ThemeErrorsType;
  defaultOld: ThemeErrorsType;
  flatOld: ThemeErrorsType;
  theme2022: ThemeErrorsType;
  theme2022Dark: ThemeErrorsType;
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

  return 'default';
};
export class ThemeContextPlayground extends React.Component<PlaygroundProps, PlaygroundState> {
  private readonly editableThemesItems = [
    { value: ThemeType.Default, label: 'Дефолтная' },
    { value: ThemeType.Dark, label: 'Темная' },
    { value: ThemeType.DefaultOld, label: 'Старая дефолтная' },
    { value: ThemeType.FlatOld, label: 'Старая плоская' },
    { value: ThemeType.Theme2022, label: 'Новая 2022' },
    { value: ThemeType.Theme2022Dark, label: 'Новая 2022 Тёмная' },
  ];

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      currentTheme: DEFAULT_THEME,
      currentThemeType: ThemeType.Default,
      editorOpened: false,
      themes: {
        default: DEFAULT_THEME,
        defaultOld: DEFAULT_THEME_8PX_OLD,
        dark: DARK_THEME,
        flatOld: FLAT_THEME_8PX_OLD,
        theme2022: THEME_2022,
        theme2022Dark: THEME_2022_DARK,
      },
      themesErrors: {
        default: {},
        defaultOld: {},
        dark: {},
        flatOld: {},
        theme2022: {},
        theme2022Dark: {},
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
            <Link onClick={this.handelGetTheme}>Вывести тему в консоль</Link>
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

  private handelGetTheme = () => {
    const currentTheme = this.state.currentTheme;
    const themeObject: Writeable<ThemeIn> = {};
    ThemeFactory.getKeys(currentTheme).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(currentTheme, key);
      if (descriptor && !descriptor.get && DEFAULT_THEME[key] && currentTheme[key] !== DEFAULT_THEME[key]) {
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
