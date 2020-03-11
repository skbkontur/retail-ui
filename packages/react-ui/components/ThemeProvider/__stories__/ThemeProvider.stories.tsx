import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeContextPlayground } from '../../internal/ThemePlayground/ThemeContextPlayground';

storiesOf('ThemeProvider', module).add('playground', () => <ThemeContextPlayground />);
