import { render, screen } from '@testing-library/react';
import React from 'react';

import { Group, GroupDataTids } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { styles } from '../Group.styles';


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

  it('main element in group gets "stretch" class', () => {
    render(
      <Group>
        <Input width="100%" data-tid="test-input" />
        <Button data-tid="test-button">Test</Button>
      </Group>,
    );
    const wrappingElements = screen.getByTestId(GroupDataTids.root).childNodes;
    expect(wrappingElements[0]).toHaveClass(styles.stretch());
    expect(wrappingElements[1]).toHaveClass(styles.fixed());
  });

  it('group does not render wrong child', () => {
    render(<Group>{undefined}</Group>);

    const wrappingElements = screen.getByTestId(GroupDataTids.root).childNodes;
    // eslint-disable-next-line jest-dom/prefer-in-document
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
