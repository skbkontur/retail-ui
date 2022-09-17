import React from 'react';

import { Story } from '../../../typings/stories';
import { ThemeContextPlayground } from '../../../internal/ThemePlayground/ThemeContextPlayground';
import { delay } from '../../../lib/utils';

export default { title: 'ThemeProvider' };

export const Playground: Story = () => <ThemeContextPlayground />;
Playground.storyName = 'playground';
