import { Theme } from '../../lib/theming/Theme';
import { DEFAULT_THEME_OLD } from '../../lib/theming/themes/DefaultThemeOld';
import { FLAT_THEME_OLD } from '../../lib/theming/themes/FlatThemeOld';
import { IS_PROXY_SUPPORTED } from '../../lib/Supports';

export interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}

export interface ComponentDescriptionType {
  [elementName: string]: ComponentRowDescriptionType;
}

export interface ComponentRowDescriptionType {
  variables: Array<keyof Theme>;
  dependencies: VariableDependencies;
}

export interface VariableNameToComponentsMap {
  [variableName: string]: DescriptionsType;
}

export interface VariableDependencies {
  [variableName: string]: Array<keyof Theme>;
}

let callsCount = 0;
let executionTime = 0;
const ALL_USED_VARIABLES_SET = new Set<keyof Theme>();

export const COMPONENT_DESCRIPTIONS: DescriptionsType = {};
export const COMPONENT_DESCRIPTIONS_BY_VARIABLE: VariableNameToComponentsMap = {};

if (IS_PROXY_SUPPORTED) {
  const baseThemes: Theme[] = [];
  baseThemes.push(DEFAULT_THEME_OLD);
  baseThemes.push(FLAT_THEME_OLD);

  const componentsContext = require.context('../../../', true, /\.styles.ts$/);
  componentsContext.keys().forEach((fileName) => {
    const fileNameStart = fileName.lastIndexOf('/') + 1;
    const componentName = fileName.substring(fileNameStart).replace('.styles.ts', '');
    const componentDescription: ComponentDescriptionType = {};
    const jsStyles = componentsContext(fileName).jsStyles;

    Object.keys(jsStyles).forEach((elementName) => {
      const jsStyle = jsStyles[elementName];
      const variablesAccumulator = new Set<keyof Theme>();
      const dependencies: VariableDependencies = {};
      const elementProxyHandler = getProxyHandler(variablesAccumulator, dependencies);
      const themes = baseThemes.map((t) => new Proxy(t, elementProxyHandler));
      themes.forEach((t) => jsStyle(t));

      const variables = Array.from(variablesAccumulator);

      if (variables.length > 0) {
        componentDescription[elementName] = { variables, dependencies };

        variables.forEach((variableName) => {
          if (!COMPONENT_DESCRIPTIONS_BY_VARIABLE[variableName]) {
            COMPONENT_DESCRIPTIONS_BY_VARIABLE[variableName] = {};
          }

          const variableNode = COMPONENT_DESCRIPTIONS_BY_VARIABLE[variableName];
          if (!variableNode[componentName]) {
            variableNode[componentName] = {};
          }

          const componentNode = variableNode[componentName];
          if (!componentNode[elementName]) {
            componentNode[elementName] = {
              dependencies,
              variables: [variableName],
            };
          } else if (!componentNode[elementName].variables.includes(variableName)) {
            componentNode[elementName].dependencies = dependencies;
            componentNode[elementName].variables.push(variableName);
          }

          const dependenciesList = dependencies[variableName];
          if (dependenciesList) {
            dependenciesList.forEach((dependencyName) => {
              if (!COMPONENT_DESCRIPTIONS_BY_VARIABLE[dependencyName]) {
                COMPONENT_DESCRIPTIONS_BY_VARIABLE[dependencyName] = {};
              }

              const dependencyNode = COMPONENT_DESCRIPTIONS_BY_VARIABLE[dependencyName];
              if (!dependencyNode[componentName]) {
                dependencyNode[componentName] = COMPONENT_DESCRIPTIONS_BY_VARIABLE[variableName][componentName];
              }
            });
          }
        });
      }
    });

    COMPONENT_DESCRIPTIONS[componentName] = componentDescription;
  });
}

function getProxyHandler(accumulator: Set<keyof Theme>, dependencies: VariableDependencies): ProxyHandler<Theme> {
  let accessLevel = 0;
  let rootProp = '';
  return {
    get(target, prop, receiver) {
      const propName = prop as keyof Theme;
      ALL_USED_VARIABLES_SET.add(propName);
      if (accessLevel === 0) {
        rootProp = propName;
        accumulator.add(propName);
      } else {
        if (!dependencies[rootProp]) {
          dependencies[rootProp] = [propName];
        } else if (!dependencies[rootProp].includes(propName)) {
          dependencies[rootProp].push(propName);
        }
      }
      accessLevel++;
      const start = performance.now();
      const result = Reflect.get(target, prop, receiver);
      executionTime += performance.now() - start;
      callsCount++;
      accessLevel--;
      return result;
    },
  };
}

export const ALL_USED_VARIABLES = Array.from(ALL_USED_VARIABLES_SET);
export const CALLS_COUNT = callsCount;
export const EXECUTION_TIME = executionTime;
