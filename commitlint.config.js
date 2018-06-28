const fs = require('fs');
const path = require('path');

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  utils: { getComponents },
	rules: {
		'scope-enum': ctx => [2, 'always', getComponents(ctx)]
	}
};

function getComponents(context) {
  const ctx = context || {};
  const cwd = ctx.cwd || process.cwd();
  const componentsDir = path.join(cwd, 'packages/retail-ui/components/');
  const components = fs.readdirSync(componentsDir).map(item => path.join(componentsDir, item)).filter(item => fs.lstatSync(item).isDirectory());
  
  return components || [];
}
