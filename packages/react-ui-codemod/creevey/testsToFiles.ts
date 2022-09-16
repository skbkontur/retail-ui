/* eslint-disable import/no-default-export */
import path from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

import { API, FileInfo } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';
import { CreeveyStoryParams } from 'creevey';
import prettier from 'prettier';

type Stories = Record<string, CreeveyStoryParams>;

let vars = {};

const removeVariable = (api: API, c: Collection<any>, name: string): void => {
  const j = api.jscodeshift;
  c.find(j.VariableDeclarator, (node) => node.id.name === name).remove();
};

const processVariable = (api: API, c: Collection<any>, name: string): void => {
  const properties = getPropertiesFromVarible(api, c, name);

  if (properties.length) {
    vars[name] = propertiesToStringsObj(api, properties, c);
  }
};

const propertiesToStringsObj = (api: API, properties: Collection<any>, collection: Collection<any>): any => {
  const j = api.jscodeshift;
  const result = {};
  properties.forEach((p) => {
    if (p.type === 'ObjectMethod') {
      const testName = p.key.name || p.key.value;

      const testSource = j(p.body.body).toSource();
      result[testName] = Array.isArray(testSource) ? testSource.join(' ') : testSource;
    } else if (p.type === 'SpreadElement') {
      const n = p.argument.name;
      result[n] = n;
      processVariable(api, collection, n);
    }
  });

  return result;
};

const getPropertiesFromVarible = (api: API, c: Collection<any>, name: string): any[] => {
  const j = api.jscodeshift;

  const vs = c.find(j.VariableDeclarator, (node) => node.id.name === name);

  if (vs.size() === 1) {
    const v = vs.get(0).node;

    if (v.init.type !== 'ObjectExpression') {
      console.log(`VAR (${name}) IS NOT AN OBJECT!`, v.init);
    } else {
      return v.init.properties;
    }
  } else {
    console.log(`NUMBER OF VARS (${name}) IS UNEXPECTED (${vs.size()})!`);
  }

  return [];
};

const extractTests = (api: API, collection: Collection<any>, vars: any): { kind: string; stories: Stories } => {
  const j = api.jscodeshift;

  let kind = '';
  let kindTests = {};
  const stories: Stories = {};

  collection
    .find(j.ExportDefaultDeclaration)
    .find(j.ObjectProperty)
    .forEach((path) => {
      const { node } = path;

      if (node.key.name === 'title') {
        kind = node.value.value;
      }
      if (node.key.name === 'creevey') {
        let testsIndex = -1;
        node.value.properties.forEach((p, i) => {
          if (p.key.name === 'tests') {
            // console.log(j(p));
            testsIndex = i;
            kindTests = propertiesToStringsObj(api, p.value.properties, collection);
          }
        });

        if (testsIndex > -1) {
          node.value.properties.splice(testsIndex, 1);
        }
      }
    });

  if (kind) {
    collection
      .find(j.ExportNamedDeclaration)
      .find(j.VariableDeclarator)
      .forEach((path) => {
        stories[path.node.id.name] = null;
      });
  }

  const code = collection;

  Object.keys(stories).forEach((story) => {
    stories[story] = stories[story] || {};
    const creeveyObj = code
      .find(j.ExpressionStatement, (node) =>
        node.expression.left && node.expression.left.object ? node.expression.left.object.name === story : false,
      )
      .find(j.ObjectProperty, (node) => node.key.name === 'creevey')
      .forEach((path) => {
        let hasTests = false;
        path.node.value.properties.forEach((p) => {
          const paramName = p.key.name;
          if (paramName === 'tests') {
            let props = [];
            hasTests = true;

            if (p.value.type === 'Identifier') {
              const variableName = p.value.name;
              stories[story].tests = {
                [variableName]: variableName,
              };
              processVariable(api, collection, variableName);
            } else if (p.value.type === 'ObjectExpression') {
              props = p.value.properties;
            } else {
              hasTests = false;
              console.log(kind + ': TESTS IS SOMETHING UNKNOWN: ', p.value.type);
            }

            if (props.length) {
              stories[story].tests = propertiesToStringsObj(api, props, collection);
            }
          } else {
            stories[story][paramName] = j(p.value).toSource();
          }
        });

        if (hasTests) {
          path.replace();
        }
      });

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

  if (Object.keys(kindTests).length) {
    vars['kindTests'] = kindTests;

    Object.keys(stories).forEach((key) => {
      stories[key].tests = Object.assign({}, stories[key].tests, { kindTests: 'kindTests' });
    });
  }

  Object.keys(stories).forEach((key) => {
    if (!stories[key].tests) {
      delete stories[key];
    }
  });

  Object.keys(vars).forEach((name) => {
    removeVariable(api, collection, name);
  });

  return { kind, stories };
};

const createTestFile = (filePath: string, kind: string, stories: Stories, vars: any): void => {
  const mainTemplate = (kind, stories, vars) => `
    const { story, kind, test } = require('creevey');

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    ${Object.keys(vars).reduce(
      (r, v) => `
        ${r}
        const ${v} = () => {
          ${generateTests(vars[v])}
        }
      `,
      ``,
    )}

    kind("${kind}", () => {
      ${generateStories(stories, vars)}
    });
  `;

  const generateStories = (stories, vars) => {
    const storyTemplate = (story, params, vars) => {
      const { tests, ...rest } = params;
      const restParams = Object.keys(rest);
      const storyParams = restParams.length ? `{ ${restParams.map((key) => `${key}: ${rest[key]}`).join(', ')} }` : ``;
      return `
        story("${story}", (${storyParams ? `{ setStoryParameters }` : ``}) => {
          ${storyParams ? `setStoryParameters(${storyParams});` : ``}

          ${generateTests(tests, vars)}
        });
      `;
    };

    return Object.keys(stories).reduce(
      (result, story) => `
        ${result}
        ${storyTemplate(story, stories[story], vars)}
      `,
      ``,
    );
  };

  const generateTests = (tests, vars?) => {
    const testsTemplate = (test, fn, vars) => {
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
      (result, test) => `
        ${result}
        ${testsTemplate(test, tests[test], vars)}
      `,
      ``,
    );
  };

  const file = prettier.format(mainTemplate(kind, stories, vars).replace(/as HTMLElement/g, ''), {
    parser: 'typescript',
  });

  const dir = path.join(path.dirname(filePath), '../__creevey__/');

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(path.join(dir + kind + '.creevey.js'), file);
};

interface TransformOptions {
  /**
   * Альтернативный путь до контролов, который может быть настроен в проекте
   * Например, "ui" вместо "retail-ui/components"
   */
  alias: string;
  /**
   * Объединять ли разные импорты из одинаковых источников в один общий
   */
  dedupe: boolean;
}

export default function transform(file: FileInfo, api: API, options: TransformOptions) {
  // const { } = options;

  const j = api.jscodeshift;
  const result = j(file.source);
  vars = {};

  const { kind, stories } = extractTests(api, result, vars);

  if (!Object.keys(stories).length) {
    return null;
  }

  // const testsToStr = (stories: Stories): string => {
  //   return Object.keys(stories)
  //     .map((s) => {
  //       return `${s}: [${Object.keys(stories[s].tests).join(', ')}]`;
  //     })
  //     .join(', ');
  // };

  // console.dir(stories);
  console.log(`Creating ${kind}.creevey.ts`);
  createTestFile(file.path, kind, stories, vars);
  // console.log(vars);

  return result.toSource();
}

export const parser = 'tsx';
