import defaultThemeVariables from '../components/variables.less';
import flatThemeVariables from '../components/variables.flat.less';
import Upgrades from './Upgrades';

interface IndexSignature {
  [key: string]: string;
}

type VariablesObject = typeof defaultThemeVariables & typeof flatThemeVariables;
type IndexedDefaultVariables = typeof defaultThemeVariables & IndexSignature;
type IndexedFlatVariables = typeof flatThemeVariables & IndexSignature;
type IndexedVariablesObject = IndexedDefaultVariables & IndexedFlatVariables;

class ThemeManagerConstructor {
  private isFlatDesign: boolean = Upgrades.isFlatDesignEnabled();
  private theme: VariablesObject;
  private defaultTheme: IndexedVariablesObject;

  constructor() {
    this.defaultTheme = this.theme = this.constructThemeObject();
  }

  public getTheme(): VariablesObject {
    return this.theme;
  }

  public overrideTheme(overrideObject: Partial<VariablesObject>): VariablesObject {
    if (!overrideObject) {
      return this.theme;
    }
    for (const overrideVariable in overrideObject) {
      if (overrideObject.hasOwnProperty(overrideVariable) && this.theme.hasOwnProperty(overrideVariable)) {
        (this.theme as IndexedVariablesObject)[overrideVariable] = (overrideObject as IndexedVariablesObject)[
          overrideVariable
        ];
      }
    }
    return this.theme;
  }

  // DO we need it?
  public resetVariablesToDefaultValues(): VariablesObject {
    return (this.theme = this.defaultTheme as VariablesObject);
  }

  private constructThemeObject(): VariablesObject {
    const themeObject = Object.assign({}, defaultThemeVariables) as VariablesObject;
    if (this.isFlatDesign) {
      this.overrideWithFlatVariables(themeObject);
    }
    return themeObject;
  }

  private overrideWithFlatVariables(themeObject: VariablesObject): void {
    for (const key in flatThemeVariables) {
      if (flatThemeVariables.hasOwnProperty(key)) {
        (themeObject as IndexSignature)[key] = (flatThemeVariables as IndexSignature)[key];
      }
    }
  }
}

export interface ITheme extends VariablesObject {}
export default new ThemeManagerConstructor();
