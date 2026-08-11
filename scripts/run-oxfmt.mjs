/**
 * Запуск oxfmt из корня монорепозитория с дефолтным .oxfmtrc.json.
 * Использование из пакета: node ../../scripts/run-oxfmt.mjs --write .
 * Дополнительные флаги передаются как есть (в т.ч. свой --config).
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const oxfmtBin = path.join(repoRoot, 'node_modules', 'oxfmt', 'bin', 'oxfmt');
const defaultConfig = path.join(repoRoot, '.oxfmtrc.json');
const args = process.argv.slice(2);
const hasConfig = args.some((a) => a === '--config' || a === '-c' || a.startsWith('--config='));
if (!hasConfig) {
  args.push('--config', defaultConfig);
}
const result = spawnSync(process.execPath, [oxfmtBin, ...args], { stdio: 'inherit' });
process.exit(result.status ?? 1);
