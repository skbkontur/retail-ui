Отступы в тултипе подобраны так, чтобы базовая линия текста со шрифтом Segoe UI в тултипе совпадала с базовой линией стандартных контролов

```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';
import MenuIcon from '@skbkontur/react-icons/Menu';
import HelpDotIcon from '@skbkontur/react-icons/HelpDot';
import { Button, Gapped, Input, Select, Tooltip } from '@skbkontur/react-ui';

const [size, setSize] = React.useState('small');

const render = () => (
  <div
    style={{
      width: 250,
      fontSize: size === 'large' ? 16 : 14,
      fontFamily: 'Segoe UI',
    }}
  >
    Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и модернизации
    форм развития.
  </div>
);

<div style={{ fontFamily: 'Segoe UI' }}>
  <Gapped vertical>
    <Gapped>
      <div style={{ width: 40 }}>Size</div>
      <Select width={120} value={size} items={['small', 'medium', 'large']} onValueChange={setSize} size={size} />
    </Gapped>
    <Tooltip render={render} pos="right top">
      <Input size={size} leftIcon={<SearchIcon />} width={170} />
    </Tooltip>
    <Tooltip render={render} pos="right top">
      <Button size={size} icon={<MenuIcon />}>
        Menu
      </Button>
    </Tooltip>
    <Tooltip render={render} pos="right top">
      <HelpDotIcon />
    </Tooltip>
  </Gapped>
</div>;
```

Выравнивание базовой линии с RadioGroup требует дополнительных отступов.

```jsx harmony
import { Gapped, Tooltip, RadioGroup, Radio } from '@skbkontur/react-ui';

const render = () => (
  <div
    style={{
      fontSize: 14,
      fontFamily: 'Segoe UI',
    }}
  >
    Выровнено по первому Radio
  </div>
);

<div style={{ fontFamily: 'Segoe UI' }}>
  <Tooltip useWrapper={false} render={render} pos="right top">
    <div style={{ padding: '16px 0', display: 'inline-block' }}>
      <RadioGroup>
        <Gapped vertical gap={10}>
          <Radio value="2">Two</Radio>
          <Radio value="4">Four</Radio>
          <Radio value="6">Six</Radio>
          <Radio value="8">Eight</Radio>
        </Gapped>
      </RadioGroup>
    </div>
  </Tooltip>
</div>;
```

Тултип может располагаться в одной из 12 позиции и триггериться одним из 8 способов.

```jsx harmony
import { Button, Center, Gapped, Select, Tooltip } from '@skbkontur/react-ui';

const S = 60;

const Block = ({ pos, trigger, top, left, onMouseDown }) => (
  <div
    style={{
      top,
      left,
      display: 'inline-block',
      position: 'absolute',
      cursor: trigger === 'click' ? 'pointer' : 'default',
    }}
  >
    <Tooltip render={() => pos} pos={pos} trigger={trigger}>
      <div
        tabIndex={trigger === 'focus' || trigger === 'hover&focus' ? 0 : null}
        style={{
          height: S - 5,
          width: S - 5,
          background: 'white',
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
        }}
      />
    </Tooltip>
  </div>
);

class UseManualTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.tooltip = null;
  }

  render() {
    return (
      <Gapped vertical>
        <Gapped>
          <Button width={1.5 * S - 5} onClick={this.handleClickOnShow.bind(this)}>
            Show
          </Button>
          <Button width={1.5 * S - 5} onClick={this.handleClickOnHide.bind(this)}>
            Hide
          </Button>
        </Gapped>
        <Tooltip
          render={() => 'Manual tooltip'}
          pos="bottom center"
          trigger="manual"
          ref={element => {
            this.tooltip = element;
          }}
        >
          <div
            style={{
              width: 3 * S,
              height: S,
              lineHeight: `${S}px`,
              background: 'white',
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
            }}
          >
            Manual control
          </div>
        </Tooltip>
      </Gapped>
    );
  }

  handleClickOnShow() {
    if (this.tooltip) {
      this.tooltip.show();
    }
  }
  handleClickOnHide() {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }
}

const blocks = [
  { top: S, left: S * 2, pos: 'top left' },
  { top: S, left: S * 4, pos: 'top center' },
  { top: S, left: S * 6, pos: 'top right' },
  { top: S * 2, left: S * 7, pos: 'right top' },
  { top: S * 4, left: S * 7, pos: 'right middle' },
  { top: S * 6, left: S * 7, pos: 'right bottom' },
  { top: S * 7, left: S * 6, pos: 'bottom right' },
  { top: S * 7, left: S * 4, pos: 'bottom center' },
  { top: S * 7, left: S * 2, pos: 'bottom left' },
  { top: S * 6, left: S, pos: 'left bottom' },
  { top: S * 4, left: S, pos: 'left middle' },
  { top: S * 2, left: S, pos: 'left top' },
];

const [trigger, setTrigger] = React.useState('hover');

const isManual = trigger === 'manual';

<div
  style={{
    width: S * 9,
    height: S * 9,
    position: 'relative',
    border: '1px solid #dfdede',
    background: `repeating-linear-gradient(
                   45deg,
                   #fafafa,
                   #fafafa ${S / 4}px,
                   #dfdede ${S / 4}px,
                   #dfdede ${S / 2}px
                 )`,
  }}
>
  <Center>
    <Gapped vertical>
      <Gapped>
        Trigger
        <Select
          width={S * 2}
          size="small"
          value={trigger}
          items={['click', 'hover', 'focus', 'hover&focus', 'hoverAnchor', 'opened', 'closed', 'manual']}
          onValueChange={setTrigger}
        />
      </Gapped>
      {isManual ? <UseManualTooltip /> : null}
    </Gapped>
  </Center>

  {!isManual && blocks.map((block, i) => <Block key={i} {...block} trigger={trigger} />)}
</div>;
```

Есть возможность прицеплять тултип к любому HTML элементу на странице с помощью `anchorElement`. При этом сам `Tooltip` может рендериться в совершенно другом месте приложения.

```jsx harmony
import { Tooltip } from '@skbkontur/react-ui';

const S = 60;
const blockStyle = {
  height: S - 5,
  width: S - 5,
  background: 'white',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
};
const containerStyle = {
  width: S * 9,
  height: S * 9,
  position: 'relative',
  border: '1px solid #dfdede',
  background: `
    repeating-linear-gradient(
      45deg,
      #fafafa,
      #fafafa ${S / 4}px,
      #dfdede ${S / 4}px,
      #dfdede ${S / 2}px
    )
  `,
};

const blocks = [
  { top: S, left: S * 2 },
  { top: S, left: S * 4 },
  { top: S, left: S * 6 },
  { top: S * 2, left: S * 7 },
  { top: S * 4, left: S * 7 },
  { top: S * 6, left: S * 7 },
  { top: S * 7, left: S * 6 },
  { top: S * 7, left: S * 4 },
  { top: S * 7, left: S * 2 },
  { top: S * 6, left: S },
  { top: S * 4, left: S },
  { top: S * 2, left: S },
];

class AnchorTooltipExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks,
      anchor: null,
    };
  }

  render() {
    return (
      <>
        {this.state.anchor ? (
          <Tooltip anchorElement={this.state.anchor} render={() => 'Hello React'} trigger="hover" />
        ) : null}
        <div style={containerStyle}>
          {this.state.blocks.map(({ top, left }, i) => (
            <div key={i} style={{ top, left, display: 'inline-block', position: 'absolute' }}>
              <div
                style={blockStyle}
                onMouseEnter={event => this.setState({ anchor: event.target })}
                onMouseLeave={() => this.setState({ anchor: null })}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

<AnchorTooltipExample />;
```
