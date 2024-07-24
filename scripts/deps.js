const { execSync } = require('child_process');

execSync(`node scripts/update-package-registry`, { stdio: 'inherit' });

try {
    execSync(`yarn ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });
} catch (e) {}

execSync(`node scripts/update-package-registry back`, { stdio: 'inherit' });
