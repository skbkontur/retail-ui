import defaultThemeVariables from '../components/variables.less';
import flatThemeVariables from '../components/variables.flat.less';
import Upgrades from './Upgrades';
import { Nullable } from '../typings/utility-types';

interface IndexSignature {
  [key: string]: string;
}
type VariablesObject = typeof defaultThemeVariables & typeof flatThemeVariables & IndexSignature;

export default class ThemeManager {
  public static getVariables(): VariablesObject {
    if (!this.variablesConstructed) {
      this.constructVariablesObject();
    }
    return this.variables;
  }

  public static overrideVariables(themeObject: Partial<VariablesObject>): VariablesObject {
    if (!this.variablesConstructed) {
      this.constructVariablesObject();
    }
    for (const themeVariable in themeObject) {
      if (themeObject.hasOwnProperty(themeVariable) && this.variables.hasOwnProperty(themeVariable)) {
        this.variables[themeVariable] = (themeObject as VariablesObject)[themeVariable];
      }
    }
    return this.variables;
  }

  public static resetVariablesToDefaultValues(): VariablesObject {
    if (!this.variablesConstructed) {
      this.constructVariablesObject();
    }
    this.variables = this.defaultVariables as VariablesObject;
    return this.variables;
  }

  private static isFlatDesign: boolean = Upgrades.isFlatDesignEnabled();
  private static variablesConstructed: boolean = false;
  private static variables: VariablesObject = {} as VariablesObject;
  private static defaultVariables: Nullable<VariablesObject> = null;

  private static constructVariablesObject() {
    const bothThemesKeys = [...Object.keys(defaultThemeVariables), ...Object.keys(flatThemeVariables)] as Array<
      keyof VariablesObject
    >;

    this.variables = bothThemesKeys.reduce(
      (resultObj: VariablesObject, currentKey: keyof VariablesObject) => {
        if (this.isFlatDesign) {
          resultObj[currentKey] = (flatThemeVariables as IndexSignature)[currentKey];
        } else {
          resultObj[currentKey] = (defaultThemeVariables as IndexSignature)[currentKey];
        }
        return resultObj;
      },
      {} as VariablesObject,
    );
    this.variablesConstructed = true;
    if (!this.defaultVariables) {
      this.defaultVariables = this.variables;
    }
  }
}
