const fs = require('fs');
const path = require('path');

const defaultVariablesPath = path.join(__dirname, '../components/variables.less');
const flatVariablesPath = path.join(__dirname, '../components/variables.flat.less');

const LESS_VARIABLE_REGEXP = /@[a-z|_-]+:/gm;
const STRING_CAMELIZE_REGEXP_1 = /(\-|\_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;

const defaultVariablesFileContent = fs.readFileSync(defaultVariablesPath, { encoding: 'UTF-8' });
const flatVariablesFileContent = fs.readFileSync(flatVariablesPath, { encoding: 'UTF-8' });

const defaultVariablesList = defaultVariablesFileContent.match(LESS_VARIABLE_REGEXP);
const flatVariablesList = flatVariablesFileContent.match(LESS_VARIABLE_REGEXP);

function camelizeString(str) {
  return str
    .replace(STRING_CAMELIZE_REGEXP_1, (match, separator, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(STRING_CAMELIZE_REGEXP_2, match => match.toLowerCase());
}

function getCamelizeVariablesObject(variablesList) {
  const result = {};
  variablesList.forEach(i => {
    const variableWithNoColon = i.replace(':', '');
    const variableName = variableWithNoColon.replace('@', '');
    const camelizedVariable = camelizeString(variableName);

    if (result.hasOwnProperty(camelizedVariable)) {
      throw new Error(`Duplicate Key Detected for variable: ${variableWithNoColon}`);
    }

    result[camelizedVariable] = variableWithNoColon;
  });

  return result;
}

function writeCamelizedVariablesToFile(camelizedVarialbesObject, filePath) {
  const objEntries = Object.entries(camelizedVarialbesObject);
  let result = '\n';

  objEntries.forEach(i => {
    const [key, value] = i;

    result += `@value ${key}: ${value}; \n`;
  });

  fs.appendFileSync(filePath, result);
}

writeCamelizedVariablesToFile(getCamelizeVariablesObject(flatVariablesList), flatVariablesPath);
writeCamelizedVariablesToFile(getCamelizeVariablesObject(defaultVariablesList), defaultVariablesPath);
