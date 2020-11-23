// import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';

addParameters({
  creevey: {
    captureElement: '#test-element',
  },
});
addDecorator(withCreevey());
