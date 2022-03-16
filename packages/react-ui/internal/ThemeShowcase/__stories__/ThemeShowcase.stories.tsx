import React from 'react';

import { ThemeShowcase } from '../ThemeShowcase';

export default { title: 'ThemeShowcase', parameters: { creevey: { skip: true } } };

export const Playground = () => <ThemeShowcase isDebugMode={true} />;
