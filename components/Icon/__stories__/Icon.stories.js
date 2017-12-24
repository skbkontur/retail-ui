import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon';

storiesOf('Icon', module).add('All icons', () => (
  <table>
    <tbody>
      {Icon.getAllNames().map(name => (
        <tr key={name}>
          <td>
            <Icon name={name} />
          </td>
          <td>{name}</td>
        </tr>
      ))}
    </tbody>
  </table>
));
