const { execSync } = require('child_process');

execSync(`node scripts/update-package-registry`, { stdio: 'inherit' });

try {
  execSync(`yarn ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });
} catch (e) {
  // error message will be forwarded to stdio anyway
}

execSync(`node scripts/update-package-registry back`, { stdio: 'inherit' });
