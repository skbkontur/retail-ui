import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../Button';
import Gapped from '../../Gapped';

storiesOf('Button', module)
  .add('playground', () => {
    return <Button>Hello</Button>;
  })
  .add('different use', () => (
    <Gapped>
      <Button>Default</Button>
      <Button use="primary">Primary</Button>
      <Button use="success">Success</Button>
      <Button use="danger">Danger</Button>
      <Button use="pay">Pay</Button>
    </Gapped>
  ))
  .add('different sizes', () => (
    <Gapped>
      <Button>Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Gapped>
  ))
  .add('with icons', () => {
    const icon = 'ok';
    return (
      <Gapped>
        <Button icon={icon}>Small</Button>
        <Button size="medium" icon={icon}>
          Medium
        </Button>
        <Button size="large" icon={icon}>
          Large
        </Button>
      </Gapped>
    );
  })
  .add('with icon, fixed width and long text', () => {
    return (
      <Button icon="ok" width="200px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio sunt ad
        repudiandae ipsum quos! Dolores ipsam magnam maxime debitis praesentium
        aperiam laudantium. Nulla laboriosam perferendis, maiores esse unde nam
        numquam!
      </Button>
    );
  })
  .add('with arrow', () => {
    return <Button arrow>Arrow!</Button>;
  });
