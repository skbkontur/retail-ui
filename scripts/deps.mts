import { execSync } from 'child_process';

execSync(`node scripts/update-package-registry.mts`, { stdio: 'inherit' });

try {
  execSync(`yarn ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });
} catch (e) {
  // error message will be forwarded to stdio anyway
}

execSync(`node scripts/update-package-registry.mts back`, { stdio: 'inherit' });
