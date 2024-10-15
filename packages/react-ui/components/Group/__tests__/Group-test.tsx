import { render, screen } from '@testing-library/react';
import React from 'react';

import { Group, GroupDataTids } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';

describe('Group', () => {
  it('renders', () => {
    render(
      <Group>
        <Input />
        <Button>Test</Button>
      </Group>,
    );

    expect(screen.getByTestId(GroupDataTids.root)).toBeInTheDocument();
  });

  it('group does not render wrong child', () => {
    render(<Group>{undefined}</Group>);

    const wrappingElements = screen.getByTestId(GroupDataTids.root).childNodes;
    expect(wrappingElements).toHaveLength(0);
  });

  it('width is applied to the root from props', () => {
    render(
      <Group width="100px">
        <div />
      </Group>,
    );
    expect(screen.getByTestId(GroupDataTids.root)).toHaveStyle('width: 100px');
  });
});
