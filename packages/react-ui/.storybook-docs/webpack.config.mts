import { resolve, join } from 'path';

import type { Configuration, RuleSetUseItem } from 'webpack';

import { isRuleSetUseItem, hasTestInRule, hasUseInRule } from '../../../scripts/webpack-type-guards/index.ts';

const customReactDocgenLoader = resolve(__dirname, './react-docgen-loader.ts');

const getRuleLoader = (rule: unknown): string | undefined => {
  if (typeof rule !== 'object' || rule === null || !('loader' in rule)) {
    return undefined;
  }

  return typeof rule.loader === 'string' ? rule.loader : undefined;
};

const isReactDocgenLoader = (use: RuleSetUseItem | string) =>
  (typeof use === 'string' && use.includes('react-docgen-loader')) ||
  (isRuleSetUseItem(use) && use.loader.includes('react-docgen-loader'));

const replaceReactDocgenLoaderUse = (use: RuleSetUseItem | string): RuleSetUseItem | string => {
  if (!isReactDocgenLoader(use)) {
    return use;
  }

  if (typeof use === 'string') {
    return {
      loader: customReactDocgenLoader,
    };
  }

  return {
    ...use,
    loader: customReactDocgenLoader,
  };
};

export default async ({ config }: { config: Configuration }) => {
  config.devtool = false;
  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve) {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };
  }

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config.module?.rules || [])
    .filter((rule) => hasTestInRule(rule) && !rule.test.test('.css'))
    .filter((rule) => {
      if (!hasUseInRule(rule)) {
        // leave non babel-loader and non css rules untouched
        return true;
      }
      return (
        hasUseInRule(rule) &&
        !rule.use?.some((use: RuleSetUseItem) => isRuleSetUseItem(use) && use.loader.includes('babel-loader'))
      );
    }); // exclude babel-loader rules

  const reactDocgenLoaderRule = filteredStorybooksWebpackRules.find(
    (rule) =>
      getRuleLoader(rule)?.includes('react-docgen-loader') ||
      (hasUseInRule(rule) && rule.use?.some(isReactDocgenLoader)),
  );
  if (hasTestInRule(reactDocgenLoaderRule)) {
    reactDocgenLoaderRule.test = /\.(tsx)/;
    if (typeof getRuleLoader(reactDocgenLoaderRule) === 'string') {
      reactDocgenLoaderRule.loader = customReactDocgenLoader;
    }
    if (hasUseInRule(reactDocgenLoaderRule)) {
      reactDocgenLoaderRule.use = reactDocgenLoaderRule.use?.map(replaceReactDocgenLoaderUse);
    }
  }

  if (config.module?.rules) {
    config.module.rules = [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules[/\\](?!@skbkontur[/\\]colors)/,
        options: {
          babelrc: false,
          extends: join(__dirname, '../.babelrc.cjs'),
        },
      },
      // порядок config.module.rules важен, т.к. в react-docgen-loader (filteredStorybooksWebpackRules) ожидается не транспилированный babelем код
      ...filteredStorybooksWebpackRules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]-[local]-[hash:base64:4]',
                namedExport: false,
              },
            },
          },
        ],
      },
      { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
      {
        // remove after upgrading to storybook@8
        // fixes stories's cyrillic headings anchors in docs
        // turns this: https://github.com/storybookjs/storybook/blob/v7.6.19/code/ui/blocks/src/blocks/Subheading.tsx#L11
        // into this: https://github.com/storybookjs/storybook/blob/v8.0.0/code/ui/blocks/src/blocks/Subheading.tsx#L11
        test: /@storybook(\/|\\)blocks(\/|\\)/,
        loader: 'string-replace-loader',
        options: {
          // prettier-ignore
          // eslint-disable-next-line no-useless-escape
          search: 'tagID=children.toLowerCase().replace(/[^a-z0-9]/gi,\"-\")',
          replace: 'tagID=globalThis.encodeURIComponent(children.toLowerCase())',
        },
      },
      {
        // fixes storybooks default font that doesn't get changed by the theme for some reason
        // turns this: https://github.com/storybookjs/storybook/blob/v7.6.18/code/lib/theming/src/base.ts#L64
        // into: "Lab Grotesque", ...
        test: /@storybook(\/|\\)theming(\/|\\)/,
        loader: 'string-replace-loader',
        options: {
          // prettier-ignore
          search: '"Nunito Sans"',
          replace: '"Lab Grotesque"',
        },
      },
    ];
  }

  return config;
};
