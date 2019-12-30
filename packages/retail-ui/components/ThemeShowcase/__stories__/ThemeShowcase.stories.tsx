import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeShowcase } from '../ThemeShowcase';

storiesOf('ThemeShowcase', module).add('Playground', () => <ThemeShowcase isDebugMode={true} />);
