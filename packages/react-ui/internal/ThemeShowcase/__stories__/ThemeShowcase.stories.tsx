import React from 'react';

import { ThemeShowcase } from '../ThemeShowcase';

export default { title: 'ThemeShowcase', parameters: { creevey: { kind: { skip: [true] } } } };

export const Playground = () => <ThemeShowcase isDebugMode={true} />;
