import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SearchIcon from '@skbkontur/react-icons/Search';

import Input, { InputSize } from '../Input';
import Button from '../../Button';
import Gapped from '../../Gapped';

const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '90px',
  padding: '5px',
};

storiesOf('Input', module)
  .add('Inputs with different states', () => (
    <div>
      <div>
        <div style={styles}>Warning</div>
        <div id="warning-small-input-wrapper" style={styles}>
          <Input size="small" warning />
        </div>
        <div id="warning-large-input-wrapper" style={styles}>
          <Input size="large" warning />
        </div>
      </div>

      <div>
        <div style={styles}>Error</div>
        <div id="error-small-input-wrapper" style={styles}>
          <Input size="small" error />
        </div>
        <div id="error-large-input-wrapper" style={styles}>
          <Input size="large" error />
        </div>
      </div>

      <div>
        <div style={styles}>Disabled</div>
        <div id="disabled-small-input-wrapper" style={styles}>
          <Input size="small" disabled />
        </div>
        <div id="disabled-large-input-wrapper" style={styles}>
          <Input size="large" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>
          Disabled
          <br /> (with text)
        </div>
        <div id="disabled-text-small-input-wrapper" style={styles}>
          <Input size="small" value="Some text" disabled />
        </div>
        <div id="disabled-text-large-input-wrapper" style={styles}>
          <Input size="large" value="Some text" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>Placeholder</div>
        <div id="placeholder-small-input-wrapper" style={styles}>
          <Input size="small" placeholder="Placeholder" />
        </div>
        <div id="placeholder-large-input-wrapper" style={styles}>
          <Input size="large" placeholder="Placeholder" />
        </div>
      </div>

      <div>
        <div style={styles}>Password</div>
        <div id="password-small-input-wrapper" style={styles}>
          <Input size="small" value="password" type="password" />
        </div>
        <div id="password-large-input-wrapper" style={styles}>
          <Input size="large" value="password" type="password" />
        </div>
      </div>

      <div>
        <div style={styles}>Borderless</div>
        <div id="borderless-small-input-wrapper" style={styles}>
          <Input size="small" borderless />
        </div>
        <div id="borderless-large-input-wrapper" style={styles}>
          <Input size="large" borderless />
        </div>
      </div>

      <div>
        <div style={styles}>Left icon</div>
        <div id="left-icon-small-input-wrapper" style={styles}>
          <Input size="small" leftIcon={<SearchIcon />} />
        </div>
        <div id="left-icon-large-input-wrapper" style={styles}>
          <Input size="large" leftIcon={<SearchIcon />} />
        </div>
      </div>

      <div>
        <div style={styles}>Right icon</div>
        <div id="right-icon-small-input-wrapper" style={styles}>
          <Input size="small" rightIcon={<SearchIcon />} />
        </div>
        <div id="right-icon-large-input-wrapper" style={styles}>
          <Input size="large" rightIcon={<SearchIcon />} />
        </div>
      </div>
    </div>
  ))
  .add('Inputs with different sizes', () => (
    <div>
      <div id="small-input-wrapper" style={styles}>
        <Input size="small" />
      </div>
      <div id="medium-input-wrapper" style={styles}>
        <Input size="medium" />
      </div>
      <div id="large-input-wrapper" style={styles}>
        <Input size="large" />
      </div>
    </div>
  ))
  .add('Placeholder and Mask', () => (
    <div>
      <table style={{ borderSpacing: 10 }}>
        <tr>
          <td />
          <td>width: "auto"</td>
          <td>width: 100px</td>
          <td>width: 350px</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <Input placeholder="1234567890 1234567890 1234567890" />
          </td>
          <td>
            <Input width={100} placeholder="1234567890 1234567890 1234567890" />
          </td>
          <td>
            <Input width={350} placeholder="1234567890 1234567890 1234567890" />
          </td>
        </tr>
        <tr>
          <td> mask</td>
          <td>
            <Input mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
          </td>
          <td>
            <Input width={100} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
          </td>
          <td>
            <Input width={350} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
          </td>
        </tr>
        <tr>
          <td>placeholder and mask</td>
          <td>
            <Input
              mask="********** ********** **********"
              maskChar={'_'}
              alwaysShowMask
              placeholder="1234567890 1234567890 1234567890"
            />
          </td>
          <td>
            <Input
              width={100}
              mask="********** ********** **********"
              maskChar={'_'}
              alwaysShowMask
              placeholder="1234567890 1234567890 1234567890"
            />
          </td>
          <td>
            <Input
              width={350}
              mask="********** ********** **********"
              maskChar={'_'}
              alwaysShowMask
              placeholder="1234567890 1234567890 1234567890"
            />
          </td>
        </tr>
      </table>
      <table style={{ borderSpacing: 10 }}>
        <tr>
          <td />
          <td>focused</td>
          <td>blured</td>
        </tr>
        <tr>
          <td>placeholder and mask</td>
          <td>
            <Input
              autoFocus
              mask="********** ********** **********"
              maskChar={'_'}
              placeholder="1234567890 1234567890 1234567890"
            />
          </td>
          <td>
            <Input
              mask="********** ********** **********"
              maskChar={'_'}
              placeholder="1234567890 1234567890 1234567890"
            />
          </td>
        </tr>
      </table>
    </div>
  ))
  .add('Input with phone mask', () => (
    <Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
  ))
  .add('Select all by prop', () => <Input defaultValue="Some value" selectAllOnFocus />)
  .add('Select all by button', () => {
    let input: Input | null = null;

    const selectAll = () => {
      if (input) {
        input.selectAll();
      }
    };

    return (
      <div>
        <div>
          <Input ref={element => (input = element)} defaultValue="Some value" />
        </div>
        <Button onClick={selectAll}>Select all</Button>
      </div>
    );
  })
  .add('Input with maxLength attr', () => <Input maxLength={3} placeholder="maxLength={3}" />)
  .add('Manual blinking', () => {
    class Sample extends React.Component {
      private input: Input | null = null;

      public render() {
        return (
          <Gapped>
            <Input ref={this.refInput} />
            <button onClick={this.handleClick}>Blink!</button>
          </Gapped>
        );
      }

      private handleClick = () => {
        if (this.input) {
          this.input.blink();
        }
      };

      private refInput = (element: Input | null) => {
        this.input = element;
      };
    }

    return <Sample />;
  })
  .add('Prefix and suffix', () => (
    <div>
      {(['small', 'medium', 'large'] as InputSize[]).map(size => (
        <div style={{ padding: 4 }} id={`inputWithPrefixOrSuffx-${size}`}>
          <div style={{ margin: '20px 10px 10px', fontSize: '1.5em' }}>Size {size}</div>
          <div>
            <div style={{ ...styles, width: 100 }}>Prefix</div>
            <div style={styles}>
              <Input size={size} prefix="Prefix" placeholder="Placeholder" />
            </div>
            <div style={styles}>
              <Input size={size} prefix="Prefix" defaultValue="Value" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ ...styles, width: 100 }}>Suffix</div>
            <div style={styles}>
              <Input size={size} suffix="suffix" placeholder="Placeholder" />
            </div>
            <div style={styles}>
              <Input size={size} suffix="suffix" defaultValue="Value" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ ...styles, width: 100 }}>Both preffix and suffix</div>
            <div style={styles}>
              <Input size={size} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
            </div>
            <div style={styles}>
              <Input size={size} prefix="Prefix" suffix="suffix" defaultValue="Value" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ ...styles, width: 100 }}>Both preffix and suffix with rightIcon</div>
            <div style={styles}>
              <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
            </div>
            <div style={styles}>
              <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ ...styles, width: 100 }}>Both preffix and suffix with leftIcon</div>
            <div style={styles}>
              <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
            </div>
            <div style={styles}>
              <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ))
  .add('text styles reset', () => (
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
      <Gapped vertical>
        <span>Inherited Styles</span>
        <Input placeholder="Placeholder" />
        <Input defaultValue="Value" />
        <Input defaultValue="Disabled" disabled />
        <Input mask="a9*MASK" alwaysShowMask />
        <Input leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
      </Gapped>
    </div>
  ));
