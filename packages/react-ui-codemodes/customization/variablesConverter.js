const { appendFileSync, readFileSync, writeFileSync, unlinkSync, existsSync, copyFileSync } = require('fs');
const less = require('less');

const ARGS = process.argv.slice(2);
const VARIABLES_ARGUMENT_NAME = 'variables';
const OUTPUT_ARGUMENT_NAME = 'output';
const LESS_VARIABLE_REGEXP = /@[a-z|_-]+:/gm;
const STRING_CAMELIZE_REGEXP_1 = /(\-|\_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;
const ENCODING = 'UTF-8';
const TEMP_FILE_PATH = './variables.temp.less';

let variablesFilePath;
let output;

validateArguments();
parseArguments();
processFile();

function validateArguments() {
  if (!ARGS.some(i => i.startsWith(VARIABLES_ARGUMENT_NAME))) {
    throw new Error(`Argument '${VARIABLES_ARGUMENT_NAME}' is required.`);
  }

  if (!ARGS.some(i => i.startsWith(OUTPUT_ARGUMENT_NAME))) {
    throw new Error(`Argument '${OUTPUT_ARGUMENT_NAME}' is required.`);
  }
}

function parseArguments() {
  ARGS.forEach(i => {
    if (i.startsWith(VARIABLES_ARGUMENT_NAME)) {
      return parseVariablesArgument(i);
    }
    if (i.startsWith(OUTPUT_ARGUMENT_NAME)) {
      return parseOutputArgument(i);
    }
  });
}

function parseVariablesArgument(arg) {
  const [argName, pathToFile] = arg.split('=').map(i => i.trim());
  const isValidFile = existsSync(pathToFile) && pathToFile.endsWith('.less');

  if (isValidFile) {
    variablesFilePath = pathToFile;
  } else {
    throw new Error('Invalid file passed. Check `file` argument');
  }
}

function parseOutputArgument(arg) {
  const [argName, outputPath] = arg.split('=').map(i => i.trim());
  output = outputPath;
}

function processFile() {
  writeTempFile();
  processTempFile();
}

function writeTempFile() {
  copyFileSync(variablesFilePath, TEMP_FILE_PATH);
  const tempFileContent = readFileSync(TEMP_FILE_PATH, { encoding: ENCODING });
  const variables = tempFileContent.match(LESS_VARIABLE_REGEXP);
  const locals = getLocals(variables);

  writeLocalsToFile(locals, TEMP_FILE_PATH);
}

function processTempFile() {
  const tempFileContent = readFileSync(TEMP_FILE_PATH, { encoding: ENCODING });
  less.render(tempFileContent).then(lessRenderCallback);
}

function lessRenderCallback(renderResult) {
  const outputToWrite = getJsObjectFromLocals(renderResult.css);

  writeThemeToOutput(outputToWrite);
  removeTempFile();
}

function getJsObjectFromLocals(locals) {
  const fields = locals.trim().split(';');
  const parsedFields = parseFields(fields);
  const fieldsToWrite = parsedFields.join(',\n ');

  return `export default {\n ${fieldsToWrite} \n}; \n`;
}

function parseFields(fields) {
  return fields.filter(Boolean).map(i => {
    return parseField(i);
  });
}

function parseField(field) {
  field = field.replace(/@value /gm, '').replace(/\n/gm, '');
  const [key, value] = field.split(': ');

  return `${key}: "${value}"`;
}

function writeThemeToOutput(content) {
  writeFileSync(output, content);
}

function removeTempFile() {
  unlinkSync(TEMP_FILE_PATH);
}

function writeLocalsToFile(camelizedVarialbesObject, filePath) {
  const entries = Object.entries(camelizedVarialbesObject);
  const localsArr = [];

  entries.forEach(i => {
    const [key, value] = i;
    localsArr.push(`@value ${key}: ${value};`);
  });

  appendFileSync(filePath, localsArr.join('\n'));
}

function getLocals(variablesList) {
  const result = {};
  variablesList.forEach(i => {
    const variableWithNoColon = i.replace(':', '');
    const variableName = variableWithNoColon.replace('@', '').replace('flat', '');
    const camelizedVariable = camelizeString(variableName);

    result[camelizedVariable] = variableWithNoColon;
  });

  return result;
}

function camelizeString(str) {
  return str
    .replace(STRING_CAMELIZE_REGEXP_1, (match, separator, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(STRING_CAMELIZE_REGEXP_2, match => match.toLowerCase());
}
