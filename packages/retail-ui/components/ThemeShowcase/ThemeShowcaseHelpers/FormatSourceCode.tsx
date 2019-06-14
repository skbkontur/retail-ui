import * as React from 'react';
import warning from 'warning';
import styles from '../ThemeShowcase.less';
import { Nullable } from '../../../typings/utility-types';

export function formatSourceCode(input: string, componentName: string) {
  const regEx = /\.css\(templateObject_[\d]+\s+\|\|\s+\(templateObject_[\d]+\s+=\s+tslib_[\d]+\.__makeTemplateObject\((\[[\S\s]+\]),\s+(\[[\S\s]+\])\)\),\s+([\s\S]+)\);/gm;

  const sourceParts = regEx.exec(input);
  if (!sourceParts) {
    warning(false, 'Could not parse jsStyles for source');
    return <span>{input}</span>;
  }

  const cookedAsString = sourceParts[1];
  const rawAsString = sourceParts[2];

  const rawArray: string[] = JSON.parse(rawAsString);
  const cookedArray: string[] = JSON.parse(cookedAsString);
  warning(cookedArray.length === rawArray.length, 'Raw and Cooked arrays have different length, consider revising');

  const variablesArray = parseVariables(sourceParts[3]);
  warning(cookedArray.length === variablesArray.length + 1, 'Variables array has suspicious length, consider revising');

  const tokens = cookedArray.map((literal, index) => {
    return (
      <React.Fragment key={`group_${index}`}>
        <span>{literal}</span>
        {variablesArray[index] && renderVariables(variablesArray[index], componentName)}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <span key={'prefix'}>{'css: {'}</span>
      {tokens}
      <span key={`suffix`}>{'}'}</span>
    </React.Fragment>
  );
}

function renderVariables(variableString: string, componentName: string) {
  variableString = variableString
    .replace(/ColorFunctions_[\d]+\.default\./g, 'ColorFunctions.')
    .replace(/DimensionFunctions_[\d]+\.default\./g, 'DimensionFunctions.')
    .replace(/AnimationKeyframes_[\d]+\.AnimationKeyframes\./g, 'AnimationKeyframes.');

  const className = getClassName(variableString, componentName);
  const theme = getTheme(variableString);

  return (
    <React.Fragment>
      <span>{'${'}</span>
      {className && renderClassName(className)}
      {!className && theme && renderTheme(theme)}
      {!className && !theme && renderUnknown(variableString)}
      <span>{'}'}</span>
    </React.Fragment>
  );
}

function getClassName(variableString: string, componentName: string) {
  const classNameRegExp = new RegExp(componentName + '_less_[\\d]+\\.default\\.', '');
  if (classNameRegExp.test(variableString)) {
    return variableString.replace(classNameRegExp, '');
  }
  return null;
}

function renderClassName(className: string) {
  return (
    <React.Fragment>
      <span className={styles.cssClassObject}>classNames.</span>
      <span className={styles.cssClassName}>{className}</span>
    </React.Fragment>
  );
}

function getTheme(variableString: string) {
  const themeRegExp = /\bt(?:\.([a-zA-Z0-9]+))?\b/gm;

  if (themeRegExp.test(variableString)) {
    themeRegExp.lastIndex = 0;
    let match: Nullable<RegExpExecArray> = null;
    const result = [];
    do {
      const start = themeRegExp.lastIndex;
      match = themeRegExp.exec(variableString);
      if (match) {
        const textBefore = variableString.substring(start, match.index);
        const key = `${start}_${match.index}`;
        const themeProp = match[1];
        result.push(<span key={`${key}_textBefore`}>{textBefore}</span>);
        result.push(
          <span key={`${key}_themeObject`} className={styles.cssThemeObject}>
            theme
            {themeProp ? '.' : ''}
          </span>,
        );
        if (themeProp) {
          result.push(
            <span key={`${key}_themePropName`} className={styles.cssThemeProp}>
              {themeProp}
            </span>,
          );
        }
      } else {
        result.push(<span key={`${start}_${variableString.length}_textAfter`}>{variableString.substring(start)}</span>);
      }
    } while (match);

    return result;
  }
  return null;
}

function renderTheme(children: React.ReactNode) {
  return <React.Fragment>{children}</React.Fragment>;
}

function renderUnknown(unknown: string) {
  warning(false, 'Could not parse variable content');
  return <span>{unknown}</span>;
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
