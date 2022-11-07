/* eslint-disable import/no-default-export */
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { exec } from 'child_process';

import { API, FileInfo, ObjectExpression, VariableDeclarator } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';
import type { CreeveyStoryParams } from 'creevey';

type StringifiedTests = Record<string, string>;
type StringifiedCreeveyParams = Record<keyof CreeveyStoryParams, string>;
type ExtractedCreeveyParams = Partial<Omit<StringifiedCreeveyParams, 'tests'> & { tests: StringifiedTests }>;
type ExtractedStories = Record<string, ExtractedCreeveyParams>;
type GlobalVariables = Record<string, unknown>;

/**
 * Remove variable declaration from code by its name
 */
const removeVariable = (api: API, c: Collection<any>, name: string): void => {
  const j = api.jscodeshift;
  c.find(j.VariableDeclarator, (node) => node.id.name === name).remove();
};

/**
 * Extract properties from a variable and store them globally
 */
const processVariable = (api: API, c: Collection<any>, name: string, vars: GlobalVariables): void => {
  const properties = getPropertiesFromVarible(api, c, name);

  if (properties.length) {
    vars[name] = stringifyTests(api, properties, c, vars);
  }
};

/**
 * Convert tests defined as object properties to strings.
 *
 * E.g., properties of
 * {
 *   testA: () => { void 0 },
 *   testA: function(){ void 0 },
 *   ['testC']() { void 0 },
 *   ...varX
 * }
 *
 * results in
 *
 * {
 *   testA: 'void 0',
 *   testB: 'void 0',
 *   testC: 'void 0',
 *   varX: 'varX'
 * }
 */
const stringifyTests = (api: API, properties: ObjectExpression['properties'], collection: Collection<any>, globalVars: GlobalVariables): StringifiedTests => {
  const j = api.jscodeshift;
  const result: StringifiedTests = {};
  properties.forEach((p) => {
    if (p.type === 'ObjectMethod' || p.type === 'ObjectProperty') {
      // { a() {} } or { a: ... }
      let testName = '';
      let testSource: string | string[] = '';
      if (p.key.type === "Identifier") {
        // { a() {} } or { a: ... }
        testName = p.key.name;
      } else if (p.key.type === "StringLiteral") {
        // { ['a']() {} } or { ['a']: ... }
        testName = p.key.value;
      }

      if (testName) {
        if (p.type === "ObjectMethod") {
          // { a() {} }
          testSource = j(p.body.body).toSource();
        } else if ( p.value.type === "ArrowFunctionExpression" || p.value.type === "FunctionExpression") {
          // { a: () => {} } or { a: function() {} }
          testSource = p.value.body.type === "BlockStatement" ?  j(p.value.body.body).toSource() : j(p.value.body).toSource();
        }
      }
      if (testSource) {
        result[testName] = Array.isArray(testSource) ? testSource.join(' ') : testSource;
      }
    } else if (p.type === 'SpreadElement' && p.argument.type === "Identifier" ) {
      // { ...varA }
      const n = p.argument.name;
      result[n] = n;
      processVariable(api, collection, n, globalVars);
    }
  });

  return result;
};

/**
 * Extract properties of object defined as variable
 */
const getPropertiesFromVarible = (api: API, c: Collection<any>, name: string): ObjectExpression['properties'] => {
  const j = api.jscodeshift;

  // const name = ...
  const vs = c.find(j.VariableDeclarator, (node) => node.id.name === name);

  if (vs.size() === 1) {
    const v: VariableDeclarator = vs.get(0).node;
    if (v.init) {
      if (v.init.type !== 'ObjectExpression') {
        // const name = ??
        console.log(`The type of the "${name}" is not supported. Expected an ObjectExpression, but got ${'ObjectExpression'}.`, v.init);
      } else {
        // const name = {...}
        return v.init.properties;
      }
    }
  } else {
    // either found no vars or too many of them
    console.log(`Can't get the definition: "${name}". Found: ${vs.size()}.`);
  }

  return [];
};

/**
 * Extract creevey tests from stories to separate files
 */
const extractTests = (api: API, collection: Collection<any>): { kind: string; stories: ExtractedStories, vars: GlobalVariables } => {
  const j = api.jscodeshift;

  let kindName = '';
  let kindTests = {};
  const stories: ExtractedStories = {};
  const vars: GlobalVariables = {};

  // extract kind's title and creevey params from default export
  collection
    .find(j.ExportDefaultDeclaration)
    .find(j.ObjectProperty)
    .forEach((path) => {
      const { node } = path;

      if (node.key.type === "Identifier") {
        if (node.key.name === 'title' && node.value.type === 'StringLiteral') {
          // export default { title: '...' }
          kindName = node.value.value;
        }
        if (node.key.name === 'creevey' && node.value.type === "ObjectExpression") {
          // export default { creevey: { ... } }
          let testsIndex = -1;
          node.value.properties.forEach((p, i) => {
            if (p.type === "ObjectProperty" && p.key.type === "Identifier" && p.key.name === 'tests') {
              // export default { creevey: { tests: { ... } } }
              testsIndex = i;

              if (p.value.type === 'Identifier') {
                // export default { creevey: { tests: variableName } }
                const variableName = p.value.name;
                kindTests = {
                  [variableName]: variableName,
                };
                processVariable(api, collection, variableName, vars);
              } else if (p.value.type === 'ObjectExpression') {
                // export default { creevey: { tests: {...} } }
                kindTests = stringifyTests(api, p.value.properties, collection, vars);
              } else {
                console.log(`${kindName}: tests are not an ObjectExpression (${p.value.type}`);
              }
            }
          });

          if (testsIndex > -1) {
            // remove tests from kind params
            // but remain the other creevey params
            node.value.properties.splice(testsIndex, 1);
          }
        }
      }

    });

  // find named exports and init stories hash
  if (kindName) {
    collection
      .find(j.ExportNamedDeclaration)
      .find(j.Identifier)
      .forEach((path) => {
        stories[path.node.name] = {};
      });
  }

  const code = collection;

  Object.keys(stories).forEach((story) => {
    const creeveyObj = code
      // find assignment of story parameters: Story.parameters = ...
      .find(j.ExpressionStatement, (node) =>
        node.expression.left && node.expression.left.object ? node.expression.left.object.name === story : false,
      )
      // find creevey parameters: Story.parameters = { creevey: ... }
      .find(j.ObjectProperty, (node) => node.key.name === 'creevey')
      .forEach((path) => {
        let hasTests = false;

        if (path.node.value.type === "ObjectExpression") {
          // Story.parameters = { creevey: { ... } }
          path.node.value.properties.forEach((p) => {
            if (p.type === 'ObjectProperty' && p.key.type === "Identifier") {
              const paramName = p.key.name as keyof ExtractedCreeveyParams;
              if (paramName === 'tests') {
                // Story.parameters = { creevey: { tests: ... } }
                let props: ObjectExpression['properties'] = [];
                hasTests = true;

                if (p.value.type === 'Identifier') {
                  // Story.parameters = { creevey: { tests: variableName } }
                  const variableName = p.value.name;
                  stories[story].tests = {
                    [variableName]: variableName,
                  };
                  processVariable(api, collection, variableName, vars);
                } else if (p.value.type === 'ObjectExpression') {
                  // Story.parameters = { creevey: { tests: {...} } }
                  props = p.value.properties;
                } else {
                  hasTests = false;
                  console.log(`${kindName}.${story}: tests are not an ObjectExpression or a variable (${p.value.type}.`);
                }

                if (props.length) {
                  stories[story].tests = stringifyTests(api, props, collection, vars);
                }
              } else {
                  // Story.parameters = { creevey: { paramName: ... } }
                stories[story][paramName] = j(p.value).toSource();
              }
            }
          });
        }

        if (hasTests) {
          // remove extracted creevey parameters from story
          path.replace();
        }
      });

    // if a story doesn't have any more parameters
    // then remove the whole parameters assignment
    if (
      creeveyObj.size() &&
      creeveyObj.get(0).parent &&
      creeveyObj.get(0).parent.value.right &&
      Array.isArray(creeveyObj.get(0).parent.value.right.properties)
    ) {
      if (!creeveyObj.get(0).parent.value.right.properties.length) {
        let o = creeveyObj.get(0);
        while ((o = o.parent)) {
          if (o.value.type === 'ExpressionStatement') {
            o.replace();
            break;
          }
        }
      }
    }
  });

  // if there are some kind-level tests
  // add them to every story as a variable
  // to unwrap later
  if (Object.keys(kindTests).length) {
    vars['kindTests'] = kindTests;

    Object.keys(stories).forEach((key) => {
      stories[key].tests = Object.assign({}, stories[key].tests, { kindTests: 'kindTests' });
    });
  }

  // if there is no tests in extracted creevey params
  // then ignore these params and leave them in a story file
  Object.keys(stories).forEach((key) => {
    if (!stories[key].tests) {
      delete stories[key];
    }
  });


  // remove variables that used to contain tests
  Object.keys(vars).forEach((name) => {
    removeVariable(api, collection, name);
  });

  return { kind: kindName, stories, vars };
};

/**
 * Generate a file with extracted tests
 */
const createTestFile = (
  filePath: string,
  kind: string,
  stories: ExtractedStories,
  vars: GlobalVariables,
  { testsPath = '../__creevey__/', prettier = true }: TransformOptions,
): void => {
  const mainTemplate = (kind: string, stories: ExtractedStories, vars: GlobalVariables) => `
    import { story, kind, test } from 'creevey';

    ${/* if there are variables containing tests, defined them at the top */''}
    ${Object.keys(vars).reduce(
      (r, v) => `
        ${r}
        const ${v} = () => {
          ${generateTests(vars[v] as StringifiedTests)}
        }
      `,
      ``,
    )}

    kind("${kind}", () => {
      ${generateStories(stories, vars)}
    });
  `;

  const generateStories = (stories: ExtractedStories, vars: GlobalVariables) => {
    const storyTemplate = (story: string, params: ExtractedCreeveyParams, vars: GlobalVariables) => {
      const { tests, ...rest } = params;
      const restParams = Object.keys(rest);
      const storyParams = restParams.length ? `{ ${restParams.map((key) => `${key}: ${rest[key as keyof typeof rest]}`).join(', ')} }` : ``;
      return `
        story("${story}", (${storyParams ? `{ setStoryParameters }` : ``}) => {
          ${storyParams ? `setStoryParameters(${storyParams});` : ``}

          ${tests ? generateTests(tests, vars) : ``}
        });
      `;
    };

    return Object.keys(stories).reduce(
      (result, storyName) => `
        ${result}
        ${storyTemplate(storyName, stories[storyName], vars)}
      `,
      ``,
    );
  };

  const generateTests = (tests: StringifiedTests, vars?: GlobalVariables): string => {
    if (!tests) {
      return '';
    }
    const testsTemplate = (test: string, fn: string, vars?: GlobalVariables) => {
      if (vars && vars[test]) {
        return `
          ${test}();
        `;
      }

      return `
        test("${test}", async function () {
          ${fn}
        });
    `;
    };

    return Object.keys(tests).reduce(
      (result, testName) => `
        ${result}
        ${testsTemplate(testName, tests[testName], vars)}
      `,
      ``,
    );
  };

  const file = mainTemplate(kind, stories, vars);

  const dir = path.isAbsolute(testsPath)
    ? path.normalize(testsPath + '/')
    : path.join(path.dirname(filePath), testsPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const ext = path.extname(filePath).startsWith('.ts') ? '.ts' : '.js';

  // handle possible stories hierarchy by taking only the last kind's subtitle
  // "KindTitle/Subtitle_1/Subtitle_2" => "Subtitle_2"
  const testFilePath = path.join(dir + kind.split('/').pop() + '.creevey' + ext);

  console.log('Creating: ' + testFilePath);

  writeFileSync(testFilePath, file);

  if (prettier) {
    exec(`prettier --write ${testFilePath}`);
  }
};

interface TransformOptions {
  /**
   * Путь для создания новых файлов с тестами. Абсолютный или относильно файла истории.
   * По умолчанию `../__creevey__`.
   */
  testsPath: string;
  /**
   * Применять ли prettier к созданным файлам.
   * По умолчанию `true`.
   */
  prettier: boolean;
}

export default function transform(file: FileInfo, api: API, options: TransformOptions) {
  const j = api.jscodeshift;
  const result = j(file.source);

  const { kind, stories, vars } = extractTests(api, result);

  if (!Object.keys(stories).length) {
    return null;
  }

  if (file.path) {
    // file.path is undefined in tests, so prevent the error
    createTestFile(file.path, kind, stories, vars, options);
  }

  return result.toSource();
}

export const parser = 'tsx';
