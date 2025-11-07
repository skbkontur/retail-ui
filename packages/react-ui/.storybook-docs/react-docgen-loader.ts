import {
  parse,
  builtinResolvers as docgenResolver,
  builtinHandlers as docgenHandlers,
  builtinImporters as docgenImporters,
  ERROR_CODES,
  utils,
} from 'react-docgen';
import MagicString from 'magic-string';
import type { LoaderContext } from 'webpack';
import type { Handler, NodePath, babelTypes as t, Documentation } from 'react-docgen';
import { logger } from '@storybook/node-logger';
import type { TransformOptions } from '@babel/core';

/**
 *
 *
 * this file is a modified version of the original react-docgen-loader from storybook
 * https://github.com/storybookjs/storybook/blob/v7.6.14/code/presets/react-webpack/src/loaders/react-docgen-loader.ts
 *
 *
 *
 */

const { getNameOrValue, isReactForwardRefCall } = utils;

const actualNameHandler: Handler = function actualNameHandler(documentation, componentDefinition) {
  if (
    (componentDefinition.isClassDeclaration() || componentDefinition.isFunctionDeclaration()) &&
    componentDefinition.has('id')
  ) {
    documentation.set('actualName', getNameOrValue(componentDefinition.get('id') as NodePath<t.Identifier>));
  } else if (
    componentDefinition.isArrowFunctionExpression() ||
    componentDefinition.isFunctionExpression() ||
    isReactForwardRefCall(componentDefinition)
  ) {
    let currentPath: NodePath = componentDefinition;

    while (currentPath.parentPath) {
      if (currentPath.parentPath.isVariableDeclarator()) {
        documentation.set('actualName', getNameOrValue(currentPath.parentPath.get('id')));
        return;
      }
      if (currentPath.parentPath.isAssignmentExpression()) {
        const leftPath = currentPath.parentPath.get('left');

        if (leftPath.isIdentifier() || leftPath.isLiteral()) {
          documentation.set('actualName', getNameOrValue(leftPath));
          return;
        }
      }

      currentPath = currentPath.parentPath;
    }
    // Could not find an actual name
    documentation.set('actualName', '');
  }
};

type DocObj = Documentation & { actualName: string };

const defaultHandlers = Object.values(docgenHandlers).map((handler) => handler);
const defaultResolver = new docgenResolver.FindAllDefinitionsResolver();
const defaultImporter = docgenImporters.fsImporter;
const handlers = [...defaultHandlers, actualNameHandler];

export default async function reactDocgenLoader(
  this: LoaderContext<{ babelOptions: TransformOptions; debug: boolean }>,
  source: string,
) {
  const callback = this.async();
  // get options
  const options = this.getOptions() || {};
  const { babelOptions = {}, debug = false } = options;

  const { plugins, presets } = babelOptions;

  try {
    const docgenResults = parse(source, {
      filename: this.resourcePath,
      resolver: defaultResolver,
      handlers,
      importer: defaultImporter,
      babelOptions: {
        babelrc: false,
        configFile: false,
        plugins,
        presets,
        parserOpts: {
          plugins: [
            'jsx',
            'typescript',
            'asyncDoExpressions',
            'decimal',
            // original: ['decorators', { decoratorsBeforeExport: false }],
            ['decorators', { decoratorsBeforeExport: true }],
            'decoratorAutoAccessors',
            'destructuringPrivate',
            'doExpressions',
            'exportDefaultFrom',
            'functionBind',
            'importAssertions',
            'moduleBlocks',
            'partialApplication',
            ['pipelineOperator', { proposal: 'minimal' }],
            ['recordAndTuple', { syntaxType: 'bar' }],
            'regexpUnicodeSets',
            'throwExpressions',
          ],
        },
      },
    }) as DocObj[];

    const magicString = new MagicString(source);

    docgenResults.forEach((info) => {
      const { actualName, ...docgenInfo } = info;

      if (actualName) {
        const publicMethods = docgenInfo.methods?.filter((method) => method.docblock?.includes('@public')) ?? [];
        const docNode = JSON.stringify(docgenInfo);

        magicString.append(`;${actualName}.__docgenInfo=${docNode}`);

        if (publicMethods.length > 0) {
          magicString.append(`;${actualName}.__methodsDocgenInfo=${JSON.stringify(publicMethods)}`);
        }
      }
    });

    const map = magicString.generateMap({ hires: true });
    callback(null, magicString.toString(), map);
  } catch (error: any) {
    if (error.code === ERROR_CODES.MISSING_DEFINITION) {
      callback(null, source);
    } else {
      if (!debug) {
        logger.warn(
          `Failed to parse ${this.resourcePath} with react-docgen. Rerun Storybook with --loglevel=debug to get more info.`,
        );
      } else {
        logger.warn(
          `Failed to parse ${this.resourcePath} with react-docgen. Please use the below error message and the content of the file which causes the error to report the issue to the maintainers of react-docgen. https://github.com/reactjs/react-docgen`,
        );
        logger.error(error);
      }

      callback(null, source);
    }
  }
}
