// @ts-nocheck
import { appendFileSync, copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import less = require('less');

const ARGS = process.argv.slice(2);
const VARIABLES_ARGUMENT_NAME = 'variables';
const OUTPUT_ARGUMENT_NAME = 'output';
const LESS_VARIABLE_REGEXP = /@[a-z|_-]+:/gm;
const STRING_CAMELIZE_REGEXP_1 = /(-|_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;
const ENCODING = 'utf-8' as const;
const TEMP_FILE_PATH = './variables.temp.less';

let variablesFilePath: string;
let output: string;

validateArguments();
parseArguments();
void processFile().catch((err: unknown) => {
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

function parseVariablesArgument(arg: string) {
  const [, pathToFile] = arg.split('=').map((s) => s.trim());
  const isValidFile = pathToFile && existsSync(pathToFile) && pathToFile.endsWith('.less');

  if (isValidFile) {
    variablesFilePath = pathToFile;
  } else {
    throw new Error('Invalid file passed. Check `file` argument');
  }
}

function parseOutputArgument(arg: string) {
  const [, outputPath] = arg.split('=').map((i) => i.trim());
  output = outputPath ?? '';
}

async function processFile() {
  writeTempFile();
  await processTempFile();
}

function writeTempFile() {
  copyFileSync(variablesFilePath, TEMP_FILE_PATH);
  const tempFileContent = readFileSync(TEMP_FILE_PATH, { encoding: ENCODING });
  const variables = tempFileContent.match(LESS_VARIABLE_REGEXP) ?? [];
  const locals = getLocals(variables);

  writeLocalsToFile(locals, TEMP_FILE_PATH);
}

async function processTempFile() {
  const tempFileContent = readFileSync(TEMP_FILE_PATH, { encoding: ENCODING });
  const renderResult = await less.render(tempFileContent);
  const outputToWrite = getJsObjectFromLocals(renderResult.css);

  writeThemeToOutput(outputToWrite);
  removeTempFile();
}

function getJsObjectFromLocals(locals: string) {
  const fields = locals.trim().split(';');
  const parsedFields = parseFields(fields);
  const fieldsToWrite = parsedFields.join(',\n ');

  return `export default {\n ${fieldsToWrite} \n}; \n`;
}

function parseFields(fields: string[]) {
  return fields.filter(Boolean).map((i) => parseField(i));
}

function parseField(field: string) {
  const parsedField = field.replace(/@value /gm, '').replace(/\n/gm, '');
  const [key, value] = parsedField.split(': ');

  return `${key}: "${value}"`;
}

function writeThemeToOutput(content: string) {
  writeFileSync(output, content, ENCODING);
}

function removeTempFile() {
  unlinkSync(TEMP_FILE_PATH);
}

function writeLocalsToFile(camelizedVarialbesObject: Record<string, string>, filePath: string) {
  const entries = Object.entries(camelizedVarialbesObject);
  const localsArr: string[] = [];

  entries.forEach((i) => {
    const [key, value] = i;
    localsArr.push(`@value ${key}: ${value};`);
  });

  appendFileSync(filePath, localsArr.join('\n'), ENCODING);
}

function getLocals(variablesList: string[]) {
  const result: Record<string, string> = {};
  variablesList.forEach((i) => {
    const variableWithNoColon = i.replace(':', '');
    const variableName = variableWithNoColon.replace('@', '').replace('flat', '');
    const camelizedVariable = camelizeString(variableName);

    result[camelizedVariable] = variableWithNoColon;
  });

  return result;
}

function camelizeString(str: string) {
  return str
    .replace(STRING_CAMELIZE_REGEXP_1, (match, separator, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(STRING_CAMELIZE_REGEXP_2, (match) => match.toLowerCase());
}
