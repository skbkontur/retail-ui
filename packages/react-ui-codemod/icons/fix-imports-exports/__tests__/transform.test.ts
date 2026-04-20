import { fileURLToPath } from 'url';
import path from 'path';

import { defineTest } from 'jscodeshift/dist/testUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

defineTest(__dirname, 'transform', null, 'test_1');
defineTest(__dirname, 'transform', null, 'test_2');
defineTest(__dirname, 'transform', null, 'test_3');
