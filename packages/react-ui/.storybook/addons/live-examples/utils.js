import remarkMdxCodeMeta from 'remark-mdx-code-meta';
export function patchWebpackConfig(config) {
  var mdxExt = '.mdx';
  //const mdx2Loader = '@storybook/mdx2-csf'; -- так на винде не работает
  var mdx2Loader = 'mdx2-csf';
  var mdxRules = config.module.rules.filter(function (rule) {
    var _rule$test;
    return (_rule$test = rule.test) === null || _rule$test === void 0 ? void 0 : _rule$test.toString().includes(mdxExt);
  });
  mdxRules.forEach(function (rule) {
    var _rule$use, _rule$use$;
    if ((_rule$use = rule.use) !== null && _rule$use !== void 0 && (_rule$use$ = _rule$use[0]) !== null && _rule$use$ !== void 0 && _rule$use$.loader.includes(mdx2Loader)) {
      rule.use[0].options.mdxCompileOptions.remarkPlugins.push(remarkMdxCodeMeta);
    }
  });
  return config;
}