import { render, screen } from '@testing-library/react';
import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { StylesContainer } from '../StylesContainer';
import { Button } from '../../../components/Button';

describe('WidgetContainer', () => {
  it('add styles in dom node', () => {
    const { container } = render(
      <StylesContainer root={globalObject.document?.body}>
        <Button>test</Button>
      </StylesContainer>,
    );

    expect(container.firstChild).not.toBeEmptyDOMElement();
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
