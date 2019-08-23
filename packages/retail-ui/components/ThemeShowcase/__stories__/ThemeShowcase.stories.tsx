import { storiesOf } from '@storybook/react';
import React from 'react';
import ThemeShowcase from '../ThemeShowcase';

storiesOf('ThemeShowcase', module).add('Playground', () => <ThemeShowcase isDebugMode={true} />);
