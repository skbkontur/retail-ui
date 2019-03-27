import defaultThemeVariables from '../components/variables.less';
import flatThemeVariables from '../components/variables.flat.less';
import Upgrades from './Upgrades';
import { Mutable } from "../typings/utility-types";

interface IndexSignature {
  [key: string]: string;
}
type VariablesObject = typeof defaultThemeVariables & typeof flatThemeVariables;
type IndexedDefaultVariables = typeof defaultThemeVariables & IndexSignature;
type IndexedFlatVariables = typeof flatThemeVariables & IndexSignature;
type IndexedVariablesObject = IndexedDefaultVariables & IndexedFlatVariables;
export interface ITheme extends VariablesObject {}

class ThemeManagerConstructor {
  private isFlatDesign: boolean = Upgrades.isFlatDesignEnabled();
  private variables: VariablesObject;
  private defaultVariables: IndexedVariablesObject;

  constructor() {
    this.defaultVariables = this.variables = this.constructVariablesObject();
  }

    return this.variables;
  }

  public overrideVariables(overrideObject: Partial<VariablesObject>): VariablesObject {
    if (!overrideObject) {
      return this.variables;
    }
    for (const overrideVariable in overrideObject) {
      if (overrideObject.hasOwnProperty(overrideVariable) && this.variables.hasOwnProperty(overrideVariable)) {
        (this.variables as IndexedVariablesObject)[overrideVariable] = (overrideObject as IndexedVariablesObject)[
          overrideVariable
        ];
      }
    }
    return this.variables;
  }

  // DO we need it?
  public resetVariablesToDefaultValues(): VariablesObject {
    this.variables = this.defaultVariables as VariablesObject;
    return this.variables;
  }

  private constructVariablesObject(): VariablesObject {
    const bothThemesKeys = [...Object.keys(defaultThemeVariables), ...Object.keys(flatThemeVariables)] as Array<
      keyof VariablesObject
    >;

    return bothThemesKeys.reduce(
      (resultObj, currentKey) => {
        if (this.isFlatDesign) {
          (resultObj as IndexSignature)[currentKey] = (flatThemeVariables as IndexedFlatVariables)[currentKey];
        } else {
          (resultObj as IndexSignature)[currentKey] = (defaultThemeVariables as IndexedDefaultVariables)[currentKey];
        }
        return resultObj;
      },
      {} as IndexedVariablesObject,
    );
  }
}

export default new ThemeManagerConstructor();
