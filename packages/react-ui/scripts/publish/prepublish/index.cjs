const { getPackageInfo, updateConfig } = require('../../package/index.cjs');
const { publishVersion, distTag, homepage, config } = getPackageInfo();

config.version = publishVersion;
config.homepage = homepage;
config.publishConfig = Object.assign({}, config.publishConfig, { tag: distTag });

updateConfig(config);

console.log(`Ready to publish: ${config.name}@${publishVersion} with the "${distTag}" tag.`);
