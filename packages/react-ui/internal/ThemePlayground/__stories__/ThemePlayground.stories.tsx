import React from 'react';

import type { Story } from '../../../typings/stories.js';
import { ThemeContextPlayground } from '../ThemeContextPlayground.js';
import { UnlinkVarsPlayground } from '../UnlinkVarsPlayground.js';

export default { title: 'ThemeProvider' };

export const Playground: Story = () => <ThemeContextPlayground />;
Playground.storyName = 'playground';

export const UnlinkVars: Story = () => <UnlinkVarsPlayground />;
