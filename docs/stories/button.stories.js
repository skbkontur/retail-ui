import React from 'react';
import {storiesOf, action, addDecorator} from '@kadira/storybook';
import {
  withKnobs,
  text,
  boolean,
  select,
  number,
} from '@kadira/storybook-addon-knobs';
import Button from '../../components/Button';
import Gapped from '../../components/Gapped';
import Icon from '../../components/Icon';

const getKnobs = () => ({
  use: select('use', ['default', 'primary', 'success', 'danger', 'pay'], 'default'),
  size: select('size', ['small', 'medium', 'large'], 'small'),
  children: text('children', 'Hello'),
  loading: boolean('loading', false),
  disabled: boolean('disabled', false),
  active: boolean('active', false),
  checked: boolean('checked', false),
  width: number('width'),
  icon: select('icon', Icon.getAllNames()),
})

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('playground', () => {
    const {icon, children, ...rest} = getKnobs()
    return <Button {...rest}>
      {icon && <Icon name={icon} />}
      {icon && ' '}
      {children}
    </Button>
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
    const icon = select('icon', Icon.getAllNames(), 'ok');
    return <Gapped>
      <Button><Icon name={icon}/> Small</Button>
      <Button size="medium"><Icon name={icon} /> Medium</Button>
      <Button size="large"><Icon name={icon}/> Large</Button>
    </Gapped>
  });
