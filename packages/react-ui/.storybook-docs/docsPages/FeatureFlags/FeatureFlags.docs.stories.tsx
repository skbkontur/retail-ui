import React from 'react';
import {
  Button,
  ComboBox,
  DateInput,
  DatePicker,
  Gapped,
  Group,
  Hint,
  Input,
  RadioGroup,
  ReactUIFeatureFlagsContext,
  Sticky,
  Tooltip,
  SidePage,
} from '@skbkontur/react-ui';
import { MathFunctionIcon } from '@skbkontur/icons/icons/MathFunctionIcon';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';

import type { Meta, Story } from '../../../typings/stories';
import { emit } from '../../../lib/LayoutEvents';
import { FeatureFlagToggle } from '../../FeatureFlagToggle';

export default {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
} as Meta;

export const DateInputFixSameNumberTypingOnRefocus: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [value, setValue] = React.useState('');
  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ dateInputFixSameNumberTypingOnRefocus: isFlagEnabled }}>
        <DateInput value={value} onValueChange={setValue} />
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const DateInputAllowInvalidValuesInDays: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [value, setValue] = React.useState('01.02.2025');
  const [error, setError] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);
  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };
  const validate = () => {
    const errorNew = DatePicker.validate(value);
    setError(!errorNew);
    setTooltip(!errorNew);
  };
  const removeTooltip = () => setTooltip(false);
  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ dateInputAllowInvalidValuesInDays: isFlagEnabled }}>
        <Tooltip trigger={tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
          <DatePicker
            error={error}
            value={value}
            onValueChange={setValue}
            onFocus={unvalidate}
            onBlur={validate}
            enableTodayLink
          />
        </Tooltip>
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const RadioGroupRemoveBaselineSpacer: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider
        value={{
          radioGroupRemoveBaselineSpacer: isFlagEnabled,
        }}
      >
        <div
          style={{
            background: '#ed3f3f',
            margin: '5px',
            display: 'inline-block',
          }}
        >
          <RadioGroup
            style={{
              background: 'white',
            }}
            name="number-simple"
            items={['One', 'Two', 'Three', 'Four']}
            defaultValue="One"
          />
        </div>
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const StickyReduceLayoutEvents: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [sticky, setSticky] = React.useState(false);
  const [stickyOffset, setStickyOffset] = React.useState(8);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const toggleSticky = () => setSticky(!sticky);
  const handleOffsetChange = () => setStickyOffset(Math.random() * 200);
  // Tooltip не должен перерисовываться, чтобы демонстрировать эффект отставания
  // т.е. его пропы и children не должны меняться
  const renderTooltip = React.useCallback(() => 'Tooltip, который отстает при включенном флаге', []);

  const content = (
    <div ref={setAnchor} style={{ display: 'inline-flex', gap: 8 }}>
      <Button onClick={toggleSticky}>1. {sticky ? 'Выключить' : 'Включить'} Sticky</Button>
      <Button onClick={handleOffsetChange}>2. Сместить кнопки</Button>
      <Button onClick={emit}>3. Поправить Tooltip</Button>
      <Button onClick={() => setIsFlagEnabled(!isFlagEnabled)}>
        4. {isFlagEnabled ? 'Выключить' : 'Включить'} флаг
      </Button>
    </div>
  );

  return (
    <div>
      {anchor && <Tooltip anchorElement={anchor} render={renderTooltip} trigger="opened" pos="right middle" />}
      <div style={{ height: sticky ? 500 : 0 }} />
      <>
        <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
        <ReactUIFeatureFlagsContext.Provider
          value={{
            stickyReduceLayoutEvents: isFlagEnabled,
          }}
        >
          {sticky ? (
            <Sticky side="bottom" offset={stickyOffset}>
              {content}
            </Sticky>
          ) : (
            content
          )}
        </ReactUIFeatureFlagsContext.Provider>
      </>
    </div>
  );
};

export const ComboBoxAllowValueChangeInEditingState: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [value, setValue] = React.useState({ value: '', label: '' });

  const handleValueChange = () => {
    setValue({ value: `Update ${new Date().toLocaleString()}`, label: `Update ${new Date().toLocaleString()}` });
  };

  const getItems = () =>
    Promise.resolve([
      { value: 'Первый', label: 'Первый' },
      { value: 'Второй', label: 'Второй' },
    ]);

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ comboBoxAllowValueChangeInEditingState: isFlagEnabled }}>
        <Gapped>
          <ComboBox
            value={value}
            searchOnFocus={false}
            getItems={getItems}
            onValueChange={(value) => setValue(value)}
            onInputValueChange={(value) => {
              setValue({ value, label: value });
            }}
          />
          <Button onClick={handleValueChange}>Обновить</Button>
        </Gapped>
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const GroupAddHintsAndTooltipsSupport: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ groupAddHintAndTooltipSupport: isFlagEnabled }}>
        <Group width={350}>
          <Hint text="Обрати внимание на скругления">
            <Button>
              <MathFunctionIcon />
            </Button>
          </Hint>
          <Tooltip render={() => 'Этот Input должен растянуться'}>
            <Input width="100%" placeholder="Поиск" />
          </Tooltip>
          <Hint text="Обрати внимание на скругления">
            <Button>
              <SearchLoupeIcon />
            </Button>
          </Hint>
        </Group>
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const SidePageDisableHeaderShrink: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <ReactUIFeatureFlagsContext.Provider value={{ sidePageDisableHeaderShrink: isFlagEnabled }}>
        <SidePage onClose={close} blockBackground>
          <SidePage.Header>Title</SidePage.Header>
          <SidePage.Body>
            <div
              style={{
                background: `#d6d6d6`,
                height: 1600,
                padding: '20px 0',
              }}
            >
              <SidePage.Container>
                <p>SidePage Body Content</p>
              </SidePage.Container>
            </div>
          </SidePage.Body>
          <SidePage.Footer panel>
            <Button onClick={close}>Close</Button>
          </SidePage.Footer>
        </SidePage>
      </ReactUIFeatureFlagsContext.Provider>
    );
  }

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      {opened && renderSidePage()}
      <Button onClick={open}>Open</Button>
    </div>
  );
};

export const SidePageNotCutTitleOnStuckByDefault: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <ReactUIFeatureFlagsContext.Provider value={{ sidePageNotCutTitleOnStuckByDefault: isFlagEnabled }}>
        <SidePage onClose={close} blockBackground>
          <SidePage.Header>
            Very very very very very very very very very very very very very very very very very very very very long
            title
          </SidePage.Header>
          <SidePage.Body>
            <div
              style={{
                background: `#d6d6d6`,
                height: 1600,
                padding: '20px 0',
              }}
            >
              <SidePage.Container>
                <p>SidePage Body Content</p>
              </SidePage.Container>
            </div>
          </SidePage.Body>
          <SidePage.Footer panel>
            <Button onClick={close}>Close</Button>
          </SidePage.Footer>
        </SidePage>
      </ReactUIFeatureFlagsContext.Provider>
    );
  }

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      {opened && renderSidePage()}
      <Button onClick={open}>Open</Button>
    </div>
  );
};
