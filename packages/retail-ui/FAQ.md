## Fix broken styles with css-loader 2.x

In 2.x, `css-loader` changed default options and [disable `modules` option](https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0). To fix problem with styles, you should explicitly define `modules: 'global'`

## How to use retail-ui with storybook 5.x?

In 5.x, storybook changed [API for custom webpack configuration](https://github.com/storybooks/storybook/blob/v5.0.0/MIGRATION.md#webpack-config-simplifcation).
They simplify default webpack config and add some loaders. This lead to the issue [storybooks/storybook#4891](https://github.com/storybooks/storybook/issues/4891).
Because default config use `css-loader` without options, but `retail-ui` require you to use `modules: 'global'` option.

**Solution**: Replace entire `config.module.rules` from your dev webpack config. Or you can use [`webpack-merge`](https://github.com/survivejs/webpack-merge) lib to more smart replacment for `/\.css$/` rule
