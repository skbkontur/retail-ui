import React from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { FakeUserActionsTable } from '../../../internal/FakeUserActions/FakeUserActionsTable';
import { Link, LinkProps } from '../Link';

export default {
  title: 'Link/FakeUserActions',
  parameters: { creevey: { captureElement: '#FakeUserActionsTable' } },
} as Meta;

const uses: Array<LinkProps['use']> = ['default', 'success', 'danger', 'grayed'];

const LinkStatic: React.FunctionComponent<{ children: React.ReactElement }> = ({ children }) => (
  <FakeUserActionsTable propName="use" propValues={uses}>
    {children}
  </FakeUserActionsTable>
);

export const Default: Story = () => (
  <LinkStatic>
    <Link />
  </LinkStatic>
);

export const Icon: Story = () => (
  <LinkStatic>
    <Link icon={<Ok />} />
  </LinkStatic>
);

export const IconButton: Story = () => (
  <LinkStatic>
    <Link icon={<Ok />} _button />
  </LinkStatic>
);

export const IconAndLoading: Story = () => (
  <LinkStatic>
    <Link loading icon={<Ok />} />
  </LinkStatic>
);

export const IconAndDisabled: Story = () => (
  <LinkStatic>
    <Link disabled icon={<Ok />} />
  </LinkStatic>
);

export const DefaultContrast: Story = () => (
  <LinkStatic>
    <Link
      theme={{
        linkColor: 'red',
        linkHoverColor: 'green',
        linkActiveColor: 'blue',
        linkLineBorderBottomColor: 'red',
        linkLineHoverBorderBottomColor: 'green',
        linkLineActiveBorderBottomColor: 'blue',
      }}
    />
  </LinkStatic>
);
