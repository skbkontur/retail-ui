Отступы в тултипе подобраны так, чтобы базовая линия текста со шрифтом Segoe UI в тултипе совпадала с базовой линией стандартных контролов

```jsx
const initialState = {
  size: 'small'
};

const render = () => (
  <div
    style={{
      width: 250,
      fontSize: state.size === 'large' ? 16 : 14,
      fontFamily: 'Segoe UI'
    }}
  >
    Задача организации, в особенности же рамки и место обучения кадров влечет за
    собой процесс внедрения и модернизации форм развития.
  </div>
);

<div style={{ fontFamily: 'Segoe UI' }}>
  <Gapped vertical>
    <Gapped>
      <div style={{ width: 40 }}>Size</div>
      <Select
        width={120}
        value={state.size}
        items={['small', 'medium', 'large']}
        onChange={(e, v) => setState({ size: v })}
        size={state.size}
      />
    </Gapped>
    <Tooltip render={render} pos="right top">
      <Input size={state.size} leftIcon={<Icon name="Search" />} width={170} />
    </Tooltip>
    <Tooltip render={render} pos="right top">
      <Button size={state.size} icon="Menu">
        Menu
      </Button>
    </Tooltip>
    <Tooltip render={render} pos="right top">
      <Icon name="HelpDot" />
    </Tooltip>
  </Gapped>
</div>;
```

Тултип может располагаться в одной из 12 позиции и триггериться одним из 5 способов

```jsx
const S = 60;

const Block = ({ pos, trigger, top, left, onMouseDown }) => (
  <div
    style={{
      top,
      left,
      display: 'inline-block',
      position: 'absolute',
      cursor: trigger === 'click' ? 'pointer' : 'default'
    }}
  >
    <Tooltip render={() => pos} pos={pos} trigger={trigger}>
      <div
        tabIndex={trigger === 'focus' ? 0 : null}
        style={{
          height: S - 5,
          width: S - 5,
          background: 'white',
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
        }}
      />
    </Tooltip>
  </div>
);

let initialState = {
  trigger: 'hover',
  blocks: [
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
    { top: S * 2, left: S, pos: 'left top' }
  ]
};

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
                 )`
  }}
>
  <Center>
    <Gapped>
      Trigger
      <Select
        width={S * 2}
        size="small"
        value={state.trigger}
        items={['click', 'hover', 'focus', 'opened', 'closed']}
        onChange={(_, v) => setState({ trigger: v })}
      />
    </Gapped>
  </Center>

  {state.blocks.map((block, i) => (
    <Block key={i} {...block} trigger={state.trigger} />
  ))}
</div>;
```
