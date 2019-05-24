import * as React from 'react';
import { ITheme } from '../../lib/theming/Theme';
import ThemeFactory from '../../lib/theming/ThemeFactory';
import FLAT_THEME from '../../lib/theming/themes/FlatTheme';
import warning = require('warning');
import styles from './ThemeVariablesShowcase.less';

export interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}

export interface ComponentDescriptionType {
  [elementName: string]: ComponentRowDescriptionType;
}

export interface ComponentRowDescriptionType {
  contents: React.ReactNode[];
  variables: Array<keyof ITheme>;
  dependencies: VariableDependencies;
}

export interface VariableNameToComponentsMap {
  [variableName: string]: DescriptionsType;
}

export interface VariableDependencies {
  [variableName: string]: string[];
}

let executionTime = 0;

const ALL_USED_VARIABLES_SET = new Set<string>();
function getProxyHandler(accumulator: Set<string>, dependencies: VariableDependencies): ProxyHandler<ITheme> {
  let accessLevel = 0;
  let rootProp = '';
  return {
    get(target, prop, receiver) {
      const propName = String(prop);
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
      accessLevel--;
      return result;
    },
  };
}

const THEMES: ITheme[] = [];
THEMES.push(ThemeFactory.getDefaultTheme());
THEMES.push(ThemeFactory.create(FLAT_THEME));

export const COMPONENT_DESCRIPTIONS: DescriptionsType = {};
export const COMPONENT_DESCRIPTIONS_BY_VARIABLE: VariableNameToComponentsMap = {};

const componentsContext = require.context('../', true, /\.styles.ts$/);
componentsContext.keys().forEach(fileName => {
  const fileNameStart = fileName.lastIndexOf('/') + 1;
  const componentName = fileName.substring(fileNameStart).replace('.styles.ts', '');
  const componentDescription: ComponentDescriptionType = {};
  const jsStyles = componentsContext(fileName).default;

  Object.keys(jsStyles).forEach(elementName => {
    const jsStyle = jsStyles[elementName];
    const variablesAccumulator = new Set<string>();
    const dependencies: VariableDependencies = {};
    const elementProxyHandler = getProxyHandler(variablesAccumulator, dependencies);
    const themes = THEMES.map(t => new Proxy(t, elementProxyHandler));
    themes.forEach(t => jsStyle(t));

    const contents = formatSourceCode(jsStyle.toString(), componentName);
    const variables = Array.from(variablesAccumulator);

    componentDescription[elementName] = { contents, variables, dependencies };

    variables.forEach(variableName => {
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
          contents,
          dependencies,
          variables: [variableName],
        };
      } else if (!componentNode[elementName].variables.includes(variableName)) {
        componentNode[elementName].contents = contents;
        componentNode[elementName].dependencies = dependencies;
        componentNode[elementName].variables.push(variableName);
      }

      const dependenciesList = dependencies[variableName];
      if (dependenciesList) {
        dependenciesList.forEach(dependencyName => {
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
  });

  COMPONENT_DESCRIPTIONS[componentName] = componentDescription;
});

function formatSourceCode(input: string, componentName: string) {
  const regEx = /\.css\(templateObject_[\d]+\s+\|\|\s+\(templateObject_[\d]+\s+=\s+tslib_[\d]+\.__makeTemplateObject\((\[[\S\s]+\]),\s+(\[[\S\s]+\])\)\),\s+([\s\S]+)\);/gm;

  const sourceParts = regEx.exec(input);
  if (!sourceParts) {
    warning(false, 'Could not parse jsStyles for source');
    return [<span key={'unknown_input'}>{input}</span>];
  }

  const cookedAsString = sourceParts[1];
  const rawAsString = sourceParts[2];

  const rawArray: string[] = JSON.parse(rawAsString);
  const cookedArray: string[] = JSON.parse(cookedAsString);
  warning(cookedArray.length === rawArray.length, 'Raw and Cooked arrays have different length, consider revising');

  const variablesArray = parseVariables(sourceParts[3]);
  warning(cookedArray.length === variablesArray.length + 1, 'Variables array has suspicious length, consider revising');

  const children: React.ReactNode[] = [];
  children.push(<span key={'prefix'}>{'css: {'}</span>);
  cookedArray.forEach((literal, index) => {
    children.push(<span key={`literal_${index}`}>{literal}</span>);
    if (variablesArray[index]) {
      children.push(<span key={`variable_${index}_prefix`}>{'${'}</span>);

      let variableString = variablesArray[index];
      const classNameRegExp = new RegExp(componentName + '_less_[\\d]+\\.default\\.', '');
      const themeRegExp = /\bt\.([a-zA-Z0-9]+)/gm;
      const animationsRegExp = /AnimationKeyframes_[\d]+\.AnimationKeyframes\./g;

      if (classNameRegExp.test(variableString)) {
        children.push(
          <span key={`variable_${index}_classObject`} className={styles.cssClassObject}>
            classNames.
          </span>,
        );
        children.push(
          <span key={`variable_${index}_className`} className={styles.cssClassName}>
            {variableString.replace(classNameRegExp, '')}
          </span>,
        );
      } else if (themeRegExp.test(variableString)) {
        variableString = variableString.replace(/ColorFunctions_[\d]+\.default\./g, 'ColorFunctions.');
        variableString = variableString.replace(/DimensionFunctions_[\d]+\.default\./g, 'DimensionFunctions.');

        let start = 0;
        variableString.replace(themeRegExp, (match, propName, offset, whole) => {
          children.push(<span key={`variable_${index}_textBefore_${offset}`}>{whole.substring(start, offset)}</span>);
          children.push(
            <span key={`variable_${index}_themeObject_${offset}`} className={styles.cssThemeObject}>
              theme.
            </span>,
          );
          children.push(
            <span key={`variable_${index}_themeProp_${offset}`} className={styles.cssThemeProp}>
              {propName}
            </span>,
          );
          start = offset + match.length;

          return match;
        });

        if (start < variableString.length) {
          children.push(<span key={`variable_${index}_textAfter`}>{variableString.substring(start)}</span>);
        }
      } else if (animationsRegExp.test(variableString)) {
        children.push(
          <span key={`variable_${index}_animation`}>
            {variableString.replace(animationsRegExp, 'AnimationKeyframes.')}
          </span>,
        );
      } else {
        warning(false, 'Could not parse variable content');
        children.push(<span key={`variable_${index}_unknown`}>{variableString}</span>);
      }

      children.push(<span key={`variable_${index}_suffix`}>{'}'}</span>);
    }
  });
  children.push(<span key={`suffix`}>{'}'}</span>);
  return children;
}

function parseVariables(input: string) {
  let depth = 0;
  const variables = [''];
  input
    .replace(/[\r\n]/g, '')
    .split('')
    .forEach(c => {
      const currentIndex = Math.max(0, variables.length - 1);
      if (c === '(') {
        depth++;
        variables[currentIndex] += c;
      } else if (c === ',') {
        depth > 0 ? (variables[currentIndex] += c) : variables.push('');
      } else if (c === ' ') {
        const currentVariable = variables[currentIndex];
        if (depth > 0 || (currentVariable.length > 0 && !currentVariable.endsWith(' '))) {
          variables[currentIndex] += c;
        }
      } else if (c === ')') {
        depth--;
        variables[currentIndex] += c;
      } else {
        variables[currentIndex] += c;
      }
    });
  return variables;
}

export const ALL_USED_VARIABLES = Array.from(ALL_USED_VARIABLES_SET);
export const EXECUTION_TIME = executionTime;
