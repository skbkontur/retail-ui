'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// @ts-nocheck
const fs_1 = require('fs');
const less = require('less');
const ARGS = process.argv.slice(2);
const VARIABLES_ARGUMENT_NAME = 'variables';
const OUTPUT_ARGUMENT_NAME = 'output';
const LESS_VARIABLE_REGEXP = /@[a-z|_-]+:/gm;
const STRING_CAMELIZE_REGEXP_1 = /(-|_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;
const ENCODING = 'utf-8';
const TEMP_FILE_PATH = './variables.temp.less';
let variablesFilePath;
let output;
validateArguments();
parseArguments();
void processFile().catch((err) => {
  console.error(err);
  process.exit(1);
});
function validateArguments() {
  if (!ARGS.some((i) => i.startsWith(VARIABLES_ARGUMENT_NAME))) {
    throw new Error(`Argument '${VARIABLES_ARGUMENT_NAME}' is required.`);
  }
  if (!ARGS.some((i) => i.startsWith(OUTPUT_ARGUMENT_NAME))) {
    throw new Error(`Argument '${OUTPUT_ARGUMENT_NAME}' is required.`);
  }
}
function parseArguments() {
  ARGS.forEach((i) => {
    if (i.startsWith(VARIABLES_ARGUMENT_NAME)) {
      parseVariablesArgument(i);
    }
    if (i.startsWith(OUTPUT_ARGUMENT_NAME)) {
      parseOutputArgument(i);
    }
  });
}
function parseVariablesArgument(arg) {
  const [, pathToFile] = arg.split('=').map((s) => s.trim());
  const isValidFile = pathToFile && (0, fs_1.existsSync)(pathToFile) && pathToFile.endsWith('.less');
  if (isValidFile) {
    variablesFilePath = pathToFile;
  } else {
    throw new Error('Invalid file passed. Check `file` argument');
  }
}
function parseOutputArgument(arg) {
  const [, outputPath] = arg.split('=').map((i) => i.trim());
  output = outputPath !== null && outputPath !== void 0 ? outputPath : '';
}
async function processFile() {
  writeTempFile();
  await processTempFile();
}
function writeTempFile() {
  var _a;
  (0, fs_1.copyFileSync)(variablesFilePath, TEMP_FILE_PATH);
  const tempFileContent = (0, fs_1.readFileSync)(TEMP_FILE_PATH, { encoding: ENCODING });
  const variables = (_a = tempFileContent.match(LESS_VARIABLE_REGEXP)) !== null && _a !== void 0 ? _a : [];
  const locals = getLocals(variables);
  writeLocalsToFile(locals, TEMP_FILE_PATH);
}
async function processTempFile() {
  const tempFileContent = (0, fs_1.readFileSync)(TEMP_FILE_PATH, { encoding: ENCODING });
  const renderResult = await less.render(tempFileContent);
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
  return fields.filter(Boolean).map((i) => parseField(i));
}
function parseField(field) {
  const parsedField = field.replace(/@value /gm, '').replace(/\n/gm, '');
  const [key, value] = parsedField.split(': ');
  return `${key}: "${value}"`;
}
function writeThemeToOutput(content) {
  (0, fs_1.writeFileSync)(output, content, ENCODING);
}
function removeTempFile() {
  (0, fs_1.unlinkSync)(TEMP_FILE_PATH);
}
function writeLocalsToFile(camelizedVarialbesObject, filePath) {
  const entries = Object.entries(camelizedVarialbesObject);
  const localsArr = [];
  entries.forEach((i) => {
    const [key, value] = i;
    localsArr.push(`@value ${key}: ${value};`);
  });
  (0, fs_1.appendFileSync)(filePath, localsArr.join('\n'), ENCODING);
}
function getLocals(variablesList) {
  const result = {};
  variablesList.forEach((i) => {
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
    .replace(STRING_CAMELIZE_REGEXP_2, (match) => match.toLowerCase());
}
