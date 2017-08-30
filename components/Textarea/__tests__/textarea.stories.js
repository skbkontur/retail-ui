// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Textarea from '../Textarea';

storiesOf('Textarea', module)
  .add('Simple', () => <Textarea />)
  .add('Filled', () =>
    <Textarea
      value={
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
        Modi enim voluptatum esse, id libero voluptas similique beatae,\
        molestiae, impedit corrupti corporis asperiores odit ullam provident\
        officia alias aperiam eum quas.'
      }
    />
  )
  .add('With error', () =>
    <Textarea
      error
      value={
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
        Modi enim voluptatum esse, id libero voluptas similique beatae,\
        molestiae, impedit corrupti corporis asperiores odit ullam provident\
        officia alias aperiam eum quas.'
      }
    />
  )
  .add('Textarea in inline-flex and text', () =>
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Textarea
          value={
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
            Modi enim voluptatum esse, id libero voluptas similique beatae,\
            molestiae, impedit corrupti corporis asperiores odit ullam\
            provident officia alias aperiam eum quas.'
          }
        />
      </div>
      Lorem text
    </div>
  );
