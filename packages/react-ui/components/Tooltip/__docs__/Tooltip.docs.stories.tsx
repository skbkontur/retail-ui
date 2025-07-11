import React from 'react';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';
import { UiMenuBars3HIcon } from '@skbkontur/icons/icons/UiMenuBars3HIcon';
import { QuestionCircleIcon } from '@skbkontur/icons/icons/QuestionCircleIcon';
import type { SizeProp, TooltipTrigger } from '@skbkontur/react-ui';
import { Tooltip, Button, Gapped, Input, Select, RadioGroup, Radio, Center } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  const [size, setSize] = React.useState<SizeProp>('small');

  const render = () => {
    const getFontSize = () => {
      switch (size) {
        case 'large':
          return 24;
        case 'medium':
          return 20;
        case 'small':
        default:
          return 16;
      }
    };

    return (
      <div
        style={{
          width: 250,
          fontSize: getFontSize(),
        }}
      >
        Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и
        модернизации форм развития.
      </div>
    );
  };

  return (
    <div>
      <Gapped vertical>
        <Gapped>
          <div style={{ width: 40 }}>Size</div>
          <Select width={120} value={size} items={['small', 'medium', 'large']} onValueChange={setSize} size={size} />
        </Gapped>
        <Tooltip render={render} pos="right top">
          <Input size={size} leftIcon={<SearchLoupeIcon />} width={170} />
        </Tooltip>
        <Tooltip render={render} pos="right top">
          <Button size={size} icon={<UiMenuBars3HIcon />}>
            Menu
          </Button>
        </Tooltip>
        <Tooltip render={render} pos="right top">
          <QuestionCircleIcon />
        </Tooltip>
      </Gapped>
    </div>
  );
};
Example1.storyName = 'Базовый пример';

/** Выравнивание базовой линии с RadioGroup требует дополнительных отступов. */
export const Example2: Story = () => {
  const render = () => <div>Выровнено по первому Radio</div>;

  return (
    <div>
      <Tooltip useWrapper={false} render={render} pos="right top">
        <div style={{ padding: '10px 0', display: 'inline-block' }}>
          <RadioGroup>
            <Gapped vertical gap={0}>
              <Radio value="2">Two</Radio>
              <Radio value="4">Four</Radio>
              <Radio value="6">Six</Radio>
              <Radio value="8">Eight</Radio>
            </Gapped>
          </RadioGroup>
        </div>
      </Tooltip>
    </div>
  );
};
Example2.storyName = 'Выравнивание базовой линии';

/** Тултип может располагаться в одной из 12 позиции и триггериться одним из 8 способов. */
export const Example3: Story = () => {
  const S = 60;

  interface Block {
    pos: string;
    trigger: TooltipTrigger;
    top: number;
    left: number;
  }

  const Block: React.FC<Block> = ({ pos, trigger, top, left }) => (
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
          tabIndex={trigger === 'focus' || trigger === 'hover&focus' ? 0 : undefined}
          style={{
            height: S - 5,
            width: S - 5,
            background: 'gray',
            border: 'solid 1px',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
          }}
        />
      </Tooltip>
    </div>
  );

  class UseManualTooltip extends React.Component {
    private tooltip: Tooltip | null = null;

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
            ref={(element) => {
              this.tooltip = element;
            }}
          >
            <div
              style={{
                width: 3 * S,
                height: S,
                lineHeight: `${S}px`,
                background: 'gray',
                border: 'solid 1px',
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

  return (
    <div
      style={{
        width: S * 9,
        height: S * 9,
        position: 'relative',
        border: '1px solid',
        background: `repeating-linear-gradient(
                                45deg,
                                #808080,
                                #808080 ${S / 4}px,
                                #d3d3d3 ${S / 4}px,
                                #d3d3d3 ${S / 2}px
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

      {!isManual && blocks.map((block, i) => <Block key={i} {...block} trigger={trigger as TooltipTrigger} />)}
    </div>
  );
};
Example3.storyName = 'Расположение тултипа';

/** Есть возможность прицеплять тултип к любому HTML элементу на странице с помощью `anchorElement`. При этом сам `Tooltip` может рендериться в совершенно другом месте приложения. */
export const Example4: Story = () => {
  interface Block {
    top: number;
    left: number;
  }

  interface Anchor {
    blocks: Block[];
    anchor: HTMLElement | null;
  }

  const S = 60;
  const blockStyle = {
    height: S - 5,
    width: S - 5,
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
    background: 'gray',
    border: '1px solid',
  };
  const containerStyle: React.CSSProperties = {
    width: S * 9,
    height: S * 9,
    position: 'relative',
    background: `repeating-linear-gradient(
                                  45deg,
                                  #808080,
                                  #808080 ${S / 4}px,
                                  #d3d3d3 ${S / 4}px,
                                  #d3d3d3 ${S / 2}px
                                )`,
    border: '1px solid',
  };

  const blocks: Block[] = [
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
    state: Anchor = {
      blocks,
      anchor: null,
    };

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
                  onMouseEnter={(event) => this.setState({ anchor: event.currentTarget })}
                  onMouseLeave={() => this.setState({ anchor: null })}
                />
              </div>
            ))}
          </div>
        </>
      );
    }
  }

  return <AnchorTooltipExample />;
};
Example4.storyName = 'anchorElement';

/** У тултипа можно переопределить задержку перед его появлением. Скрытие же происходит с задержкой по умолчанию. */
export const Example5: Story = () => {
  const [delay, setDelay] = React.useState(100);

  const render = () => <div>{`Showed with ${delay}ms delay`}</div>;
  const handleDelayChange = (value: string) => {
    const valueAsNumber = Number(value);
    setDelay(isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber);
  };

  return (
    <div>
      <Gapped vertical>
        <Gapped>
          Show delay: <Input value={delay.toString()} onValueChange={handleDelayChange} />
        </Gapped>
        <Tooltip render={render} delayBeforeShow={delay} pos="right top">
          <QuestionCircleIcon />
        </Tooltip>
      </Gapped>
    </div>
  );
};
Example5.storyName = 'Задержка перед появлением';
