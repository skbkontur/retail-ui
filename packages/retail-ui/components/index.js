

/**
 * This file is for IDE and Flow. NOT FOR PRODUCTION USAGE.
 */

export * from './all.js';

import warning from 'warning';

warning(
  false,
  'The file retail-ui/components/index.js must only be used by IDEs and Flow.' +
    ' Use retail-ui/scripts/babel/component-imports babel plugin.'
);
