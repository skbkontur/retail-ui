import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Link } from '../Link';
import { Toast } from '../../Toast';

export default { title: 'Link' };

export const Simple = () => <Link>Simple Link</Link>;
export const WithIcon = () => <Link icon={<OkIcon />}>Simple Link</Link>;
export const Danger = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);
export const Grayed = () => <Link use="grayed">Simple link</Link>;
export const Disabled = () => <Link disabled>Simple link</Link>;
export const WithOnClick = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
WithOnClick.story = { name: 'With onClick' };
