import * as React from 'react';
import { storiesOf } from '@storybook/react';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePackIcon from '@skbkontur/react-icons/ArchivePack';
import Button, { ButtonUse } from '../../Button';
import Gapped from '../../Gapped';
import { ButtonSize, ButtonArrow, ButtonProps } from '../Button';
import SearchIcon from '@skbkontur/react-icons/Search';
import ComponentStatesTable from '../../internal/ComponentStatesTable';
import StatesCombinator from '../../internal/StatesCombinator';

storiesOf('Button', module)
  .add('playground', () => {
    return <Button>Hello</Button>;
  })
  .add('with width', () => <Button width="300px">Hello</Button>)
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
    return (
      <Gapped>
        <Button icon={<OkIcon />}>Small</Button>
        <Button size="medium" icon={<OkIcon />}>
          Medium
        </Button>
        <Button size="large" icon={<OkIcon />}>
          Large
        </Button>
      </Gapped>
    );
  })
  .add('with icon, fixed width and long text', () => {
    return (
      <Button icon={<OkIcon />} width="200px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio sunt ad repudiandae ipsum quos! Dolores ipsam
        magnam maxime debitis praesentium aperiam laudantium. Nulla laboriosam perferendis, maiores esse unde nam
        numquam!
      </Button>
    );
  })
  .add('arrow table', () => {
    const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay'];
    const directions: ButtonArrow[] = [true, 'left'];
    return (
      <table style={{ borderSpacing: 10 }}>
        <thead>
          <tr>
            {directions.map((direction, index) => (
              <React.Fragment key={index}>
                {index === 0 && <th />}
                <th>disabled {direction}</th>
                <th>checked {direction}</th>
                <th>medium {direction}</th>
                <th>large {direction}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {uses.map((use, i) => (
            <tr key={i}>
              {directions.map((direction, directionIndex) => (
                <React.Fragment key={directionIndex}>
                  {directionIndex === 0 && <td>{use}</td>}
                  <td>
                    <Button arrow={direction} use={use} size="medium" disabled>
                      Button {direction}
                    </Button>
                  </td>
                  <td>
                    <Button arrow={direction} use={use} size="medium" checked>
                      Button {direction}
                    </Button>
                  </td>
                  <td>
                    <Button arrow={direction} use={use} size="medium">
                      Button {direction}
                    </Button>
                  </td>
                  <td>
                    <Button arrow={direction} use={use} size="large">
                      Button {direction}
                    </Button>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  })
  .add('table', () => {
    const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay'];
    const sizes: ButtonSize[] = ['small', 'medium', 'large'];
    return (
      <table style={{ borderSpacing: 10 }}>
        <thead>
          <tr>
            <th />
            <th>disabled</th>
            <th>loading</th>
            <th>checked</th>
            {sizes.map((x, i) => (
              <th key={i}>{x}</th>
            ))}
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
              {sizes.map((size, index: number) => (
                <td key={index}>
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
    <Button use="link" icon={<ArchivePackIcon />}>
      With Icon
    </Button>
  ))
  .add('multiline text with link button', () => (
    <div>
      "You can't keep boogieing like this. <br />
      You'll come <Button use="link">down</Button> <br />
      with a fever of some sort."
      <br />
      <i>Leela</i>
    </div>
  ))
  .add('with error', () => (
    <Gapped>
      <Button error>Error :(</Button>
      <Button error use="primary">
        Error :(
      </Button>
      <Button error use="link">
        Error :(
      </Button>
    </Gapped>
  ))
  .add('loading', () => {
    const sizes: ButtonSize[] = ['small', 'medium', 'large'];

    return (
      <Gapped vertical>
        <Gapped>
          {sizes.map((size, key) => (
            <Button key={key} size={size} loading>
              {size}
            </Button>
          ))}
        </Gapped>
        <Gapped>
          {sizes.map((size, key) => (
            <Button key={key} size={size} arrow loading>
              Arrow {size}
            </Button>
          ))}
        </Gapped>
        <Gapped>
          {sizes.map((size, key) => (
            <Button key={key} size={size} arrow="left" loading>
              Arrow left {size}
            </Button>
          ))}
        </Gapped>
      </Gapped>
    );
  })
  .add('text styles reset', () => {
    return (
      <div
        style={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontVariant: 'small-caps slashed-zero',
          fontStretch: 'expanded',
          color: 'red',
          lineHeight: '50px',
          textAlign: 'right',
          textShadow: '3px 3px 3px #333',
          textTransform: 'uppercase',
          letterSpacing: '5px',
        }}
      >
        <Gapped>
          <span>Inherited Styles</span>
          <Button>
            <SearchIcon />
          </Button>
          <Button>Button</Button>
          <Button visuallyFocused>Focused</Button>
          <Button active>Active</Button>
          <Button checked>Checked</Button>
          <Button disabled>Disabled</Button>
          <Button use="link">Link</Button>
        </Gapped>
      </div>
    );
  })
  .add('different aligns', () => (
    <ComponentStatesTable component={Button} rows={alignStates} cols={layoutStates} presetState={{ width: 200, children: 'Button' }} children='Button' />
  ))
  .add('different visual states', () => (
    <StatesCombinator states={[...visualStates, ...sizeStates, ...arrowStates, ...useStates]} sizeX={7} sizeY={7} presetState={{ children: 'Button' }} children='Button' component={Button} />
  ))
  .add('different content', () => (
    <StatesCombinator states={[...contentStates, ...widthStates, ...layoutStates]} sizeX={3} sizeY={6} component={Button} presetState={{}} children='Button' />
  ));

type ButtonState = Partial<ButtonProps>;

const visualStates: ButtonState[] = [
  { disabled: true },
  { loading: true },
  { checked: true },
  { active: true },
  { narrow: true },
  { borderless: true },
  { error: true },
  { warning: true },
  { visuallyFocused: true },
];

const sizeStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];
const arrowStates: ButtonState[] = [{ arrow: true }, { arrow: 'left' }];

const useStates: ButtonState[] = [
  { use: 'default' },
  { use: 'primary' },
  { use: 'success' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'link' },
];

const contentStates: ButtonState[] = [
  { icon: <SearchIcon /> },
  { children: 'long-long-long text' },
  { children: <SearchIcon /> },
  { children: null },
];

const widthStates: ButtonState[] = [{ width: 100 }, { width: 'auto' }, { width: undefined }, { width: 0 }];

const alignStates: ButtonState[] = [
  { align: 'left' },
  { align: 'start' },
  { align: 'right' },
  { align: 'end' },
  { align: 'center' },
  { align: 'justify' },
];

const layoutStates: ButtonState[] = [{ use: 'default' }, { arrow: true }, { arrow: 'left' }, { use: 'link' }];
