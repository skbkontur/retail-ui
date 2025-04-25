import React from 'react';

import type { Story } from '../../../typings/stories';
import { ThemeContextPlayground } from '../ThemeContextPlayground';
import { UnlinkVarsPlayground } from '../UnlinkVarsPlayground';

export default { title: 'ThemeProvider' };

export const Playground: Story = () => <ThemeContextPlayground />;
Playground.storyName = 'playground';

export const UnlinkVars: Story = () => <UnlinkVarsPlayground />;
