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
      <Button icon="Ok" width="200px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio sunt ad
        repudiandae ipsum quos! Dolores ipsam magnam maxime debitis praesentium
        aperiam laudantium. Nulla laboriosam perferendis, maiores esse unde nam
        numquam!
      </Button>
    );
  })
  .add('with arrow', () => {
    return <Button arrow>Arrow!</Button>;
  })
  .add('table', () => {
    const uses = ['default', 'primary', 'success', 'danger', 'pay'];
    const sizes = ['small', 'medium', 'large'];
    return (
      <table style={{ borderSpacing: 10 }}>
        <thead>
          <tr>
            <th />
            <th>disabled</th>
            <th>loading</th>
            <th>checked</th>
            {sizes.map((x, i) => <th key={i}>{x}</th>)}
          </tr>
        </thead>
        <tbody>
          {uses.map((use, i) => (
            <tr key={i}>
              <td>{use}</td>
              <td>
                <Button use={use} disabled>
                  Button
                </Button>
              </td>
              <td>
                <Button use={use} loading>
                  Button
                </Button>
              </td>
              <td>
                <Button use={use} checked>
                  Button
                </Button>
              </td>
              {sizes.map((size, i) => (
                <td key={i}>
                  <Button use={use} size={size}>
                    Button
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  })
  .add('use link', () => <Button use="link">Use Link</Button>)
  .add('use link with icon', () => (
    <Button use="link" icon="ArchivePack">
      With Icon
    </Button>
  ))
  .add('multiline text with link button', () => (
    <div>
      "You can't keep boogieing like this. <br />
      You'll come <Button use="link">down</Button> <br />
      with a fever of some sort."<br />
      <i>Leela</i>
    </div>
  ));
