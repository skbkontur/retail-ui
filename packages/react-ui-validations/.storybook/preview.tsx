// import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withCreevey } from 'creevey';
import React from 'react';

addParameters({
  creevey: {
    captureElement: '#test-element',
  },
});

addDecorator(withCreevey());

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
));
