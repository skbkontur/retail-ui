import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameItemToValue';

defineInlineTest(
  transform,
  {},
  `
    <div>
      <ComboBox itemToValue={(item) => item.id} />
      <Input value="test" />
    </div>
`,
  `
    <div>
      <ComboBox itemToId={(item) => item.id} />
      <Input value="test" />
    </div>
  `,
  `transforms "itemToValue" to "itemToId" for ComboBox`,
);

defineInlineTest(
  transform,
  {},
  `
    <div>
      <ComboBox itemToId={(item) => item.id} />
    </div>
`,
  ``,
  `does not transform already migrated props`,
);
