import * as React from 'react';
import warning from 'warning';
import styles from '../ThemeShowcase.less';

export function formatSourceCode(input: string, componentName: string) {
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
