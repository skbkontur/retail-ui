import React, { useRef, useState } from 'react';

import { StylesContainer } from '../../lib/styles/StylesContainer';
import shadowRoot from '../../lib/shadowDom/reactShadow';
import { Autocomplete } from '../Autocomplete';
import { Button } from '../Button';
import { Link } from '../Link';
import { Input } from '../Input';
import { ComboBox } from '../ComboBox';
import { Checkbox } from '../Checkbox';
import { Kebab } from '../Kebab';
import { Radio } from '../Radio';
import { Toggle } from '../Toggle';
import { MenuItem } from '../MenuItem';
import { Gapped } from '../Gapped';
import { Group } from '../Group';
import { Calendar } from '../Calendar';
import { Center } from '../Center';
import { CurrencyInput } from '../CurrencyInput';
import { CurrencyLabel } from '../CurrencyLabel';
import { DateInput } from '../DateInput';
import { DatePicker } from '../DatePicker';
import { Dropdown } from '../Dropdown';
import { DropdownMenu } from '../DropdownMenu';
import { FileUploader } from '../FileUploader';
import { FxInput } from '../FxInput';
import { GlobalLoader } from '../GlobalLoader';
import { Hint } from '../Hint';
import { MenuHeader } from '../MenuHeader';
import { MenuSeparator } from '../MenuSeparator';
import { Paging } from '../Paging';
import { PasswordInput } from '../PasswordInput';
import { RadioGroup } from '../RadioGroup';
import { ScrollContainer } from '../ScrollContainer';
import { Select } from '../Select';
import { Sticky } from '../Sticky';
import { Switcher } from '../Switcher';
import { Tabs } from '../Tabs';
import { Textarea } from '../Textarea';
import { Toast } from '../Toast';
import { SingleToast } from '../SingleToast';
import { Token } from '../Token';
import { TokenInput } from '../TokenInput';
import { Tooltip } from '../Tooltip';
import { TooltipMenu } from '../TooltipMenu';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { MaskedInput } from '../MaskedInput';
import { Modal } from '../Modal';
import { SidePage } from '../SidePage';
import { MiniModal } from '../MiniModal';

export default { title: 'ShadowDom' };

const ModalCase = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>in shadow root</th>
                  <th>without shadow root</th>
                  <th>with context in shadow root</th>
                </tr>
              </thead>
              <tbody>
                {Components.map((component, i) => (
                  <tr key={i}>
                    <td style={tableCellStyle}>
                      <shadowRoot.div>{component}</shadowRoot.div>
                    </td>
                    <td style={tableCellStyle}>{component}</td>
                    <td style={tableCellStyle}>
                      <shadowRoot.div>
                        <StylesContainer>{component}</StylesContainer>
                      </shadowRoot.div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

const Components: React.JSX.Element[] = [
  <Autocomplete value={'x'} onValueChange={console.log} />,
  <Button>button</Button>,
  <Calendar value={'22.11.2020'} />,
  <Center children={'center'} />,
  <Checkbox children={'checkbox'} onValueChange={console.log} />,
  <ComboBox<number> getItems={() => Promise.resolve([1, 2, 3])} renderItem={(x) => x} onValueChange={console.log} />,
  <CurrencyInput onValueChange={console.log} />,
  <CurrencyLabel value={123} />,
  <DateInput onValueChange={console.log} />,
  <DatePicker onValueChange={console.log} />,
  <Dropdown caption={'Dropdown'}>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
  </Dropdown>,
  <DropdownMenu caption={<Button>DropdownMenu</Button>}>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
  </DropdownMenu>,
  <FileUploader onValueChange={console.log} />,
  <FxInput onValueChange={console.log} />,
  <Gapped gap={0}>gap</Gapped>,
  <GlobalLoader />,
  <Group>
    <Button>button</Button>
    <Input onValueChange={console.log} showClearIcon="auto" />
  </Group>,
  <Hint text={'hint'}>hint</Hint>,
  <Input onValueChange={console.log} />,
  <Kebab>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
  </Kebab>,
  <Link>link</Link>,
  // <Loader />,
  <MenuHeader children={'MenuHeader'} />,
  <MenuItem children={'MenuItem'} />,
  <MenuSeparator children={'MenuSeparator'} />,
  // <MiniModal />,
  // <Modal />,
  <Paging activePage={0} pagesCount={6} onPageChange={console.log} />,
  <form action="">
    <PasswordInput autoComplete={'off'} onValueChange={console.log} />
  </form>,
  <Radio value={1} children={'radio'} onValueChange={console.log} />,
  <RadioGroup items={[1, 2]} onValueChange={console.log} />,
  <ScrollContainer maxHeight={100} children={<div style={{ height: 1000, backgroundColor: 'cyan' }}></div>} />,
  <Select items={[1, 2]} onValueChange={console.log} />,
  // <SidePage />,
  // <Spinner />,
  <Sticky side={'bottom'} />,
  <Switcher
    items={[
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ]}
    onValueChange={console.log}
  />,
  <Tabs value={''} />,
  <Textarea value={''} onValueChange={console.log} />,
  <Toast />,
  <SingleToast />,
  <Toggle onValueChange={console.log} />,
  <Token children={'token'} />,
  <TokenInput
    getItems={() => Promise.resolve([1, 2, 3])}
    valueToString={(x) => x.toString()}
    onValueChange={console.log}
  />,
  <Tooltip render={() => <div>Tooltip</div>}>tooltip</Tooltip>,
  <Tooltip
    trigger="click"
    render={() => {
      return (
        <Gapped vertical>
          <Dropdown caption={'Dropdown'}>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
          </Dropdown>
          <DropdownMenu caption={<Button>DropdownMenu</Button>}>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
          </DropdownMenu>
          <TooltipMenu caption={<Button>TooltipMenu</Button>}>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
          </TooltipMenu>
          <Kebab>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
            <MenuItem>MenuItem</MenuItem>
          </Kebab>
          <DatePicker onValueChange={console.log} />
          <ComboBox<number> getItems={() => Promise.resolve([1, 2, 3])} renderItem={(x) => x} />
          <FileUploader />
          <Select items={[1, 2]} />
          <TokenInput<number> getItems={() => Promise.resolve([1, 2, 3])} valueToString={(x) => x.toString()} />
          <Tooltip
            render={() => (
              <Gapped vertical>
                <Dropdown caption={'Dropdown'}>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                </Dropdown>
                <DropdownMenu caption={<Button>DropdownMenu</Button>}>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                </DropdownMenu>
                <TooltipMenu caption={<Button>TooltipMenu</Button>}>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                  <MenuItem>MenuItem</MenuItem>
                </TooltipMenu>
                <DatePicker onValueChange={console.log} />
                <ComboBox<number> getItems={() => Promise.resolve([1, 2, 3])} renderItem={(x) => x} />
                <FileUploader />
                <Select items={[1, 2]} />
                <TokenInput<number> getItems={() => Promise.resolve([1, 2, 3])} valueToString={(x) => x.toString()} />
                <Tooltip render={() => <div>Tooltip</div>}>tooltip</Tooltip>
              </Gapped>
            )}
          >
            tooltip
          </Tooltip>
        </Gapped>
      );
    }}
  >
    <Button>Trip tooltip</Button>
  </Tooltip>,
  <TooltipMenu caption={<Button>TooltipMenu</Button>}>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
    <MenuItem>MenuItem</MenuItem>
  </TooltipMenu>,
  <MaskedInput mask={'fack'} onValueChange={console.log} />,
  <ResponsiveLayout children={(currentLayout) => <div>{currentLayout.isMobile ? 'isMobile' : 'isDesktop'}</div>} />,
  <ModalCase />,
];

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  border: '1px solid #ccc',
} as React.CSSProperties;

const tableCellStyle = {
  transform: 'rotate(0deg)',
  border: '1px solid #ccc',
  padding: 10,
} as React.CSSProperties;

const styleBodyWrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: 2000,
  backgroundColor: '#ccc',
  maxWidth: 500,
} as React.CSSProperties;

const Menus = (
  <Gapped wrap>
    <DatePicker onValueChange={console.log} />
    <Tooltip render={() => <DatePicker onValueChange={console.log} />}>
      <Button>DatepickerForm</Button>
    </Tooltip>
    <Dropdown caption={'Dropdown'}>
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
    </Dropdown>
    <Hint text="Меню действий">
      <DropdownMenu
        caption={
          <Hint text="DropdownMenu">
            <Button>DropdownMenu</Button>
          </Hint>
        }
      >
        <MenuItem>MenuItem</MenuItem>
        <MenuItem>MenuItem</MenuItem>
        <MenuItem>MenuItem</MenuItem>
      </DropdownMenu>
    </Hint>
    <TooltipMenu
      caption={
        <Hint text="TooltipMenu">
          <Button>TooltipMenu</Button>
        </Hint>
      }
    >
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
    </TooltipMenu>
    <Kebab>
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
      <MenuItem>MenuItem</MenuItem>
    </Kebab>
  </Gapped>
);

export const SimpleComponents = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ maxHeight: 500, overflow: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>in shadow root</th>
            <th>without shadow root</th>
            <th>with context in shadow root</th>
          </tr>
        </thead>
        <tbody>
          {Components.map((component, i) => (
            <tr key={i}>
              <td style={tableCellStyle}>
                <shadowRoot.div>{component}</shadowRoot.div>
              </td>
              <td style={tableCellStyle}>{component}</td>
              <td style={tableCellStyle}>
                <shadowRoot.div>
                  <StylesContainer popupStrategy="fixed" getOffsetParent={() => ref.current}>
                    {component}
                  </StylesContainer>
                </shadowRoot.div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ModalScenarios = () => {
  const [shadowDom, setShadowDom] = useState<boolean>(false);
  const [showMiniModal, setShowMiniModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSidePage, setShowSidePage] = useState<boolean>(false);
  const [showSidePage2, setShowSidePage2] = useState<boolean>(false);

  const Actions = (
    <Gapped wrap>
      <Button onClick={() => setShowMiniModal(true)}>show mini modal</Button>
      <Button onClick={() => setShowModal(true)}>show modal</Button>
      <Button onClick={() => setShowSidePage(true)}>show sidepage</Button>
      <Button onClick={() => setShowSidePage2(true)}>show sidepage2</Button>
    </Gapped>
  );

  const Container = (
    <div style={{ paddingBottom: 64, width: '100%', backgroundColor: '#ccc' }}>
      <StylesContainer>
        <Gapped vertical>
          {Actions}
          {Menus}
        </Gapped>
        {showMiniModal && (
          <MiniModal onClose={() => setShowMiniModal(false)}>
            <Modal.Header>MiniModalHeader</Modal.Header>
            <Modal.Body>
              <div style={styleBodyWrapper}>
                <div>Body</div>
                {Actions}
                {Menus}
              </div>
            </Modal.Body>
            <Modal.Footer panel>{Menus}</Modal.Footer>
          </MiniModal>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Modal.Header>ModalHeader</Modal.Header>
            <Modal.Body>
              <div style={styleBodyWrapper}>
                <div>BODY</div>
                {Actions}
                {Menus}
              </div>
            </Modal.Body>
            <Modal.Footer panel>{Menus}</Modal.Footer>
          </Modal>
        )}
        {showSidePage && (
          <SidePage onClose={() => setShowSidePage(false)}>
            <SidePage.Header>SidePageHeader</SidePage.Header>
            <SidePage.Body>
              <SidePage.Container>
                <div style={styleBodyWrapper}>
                  <div>Body</div>
                  {Actions}
                  {Menus}
                </div>
              </SidePage.Container>
            </SidePage.Body>
            <SidePage.Footer panel>{Menus}</SidePage.Footer>
          </SidePage>
        )}
        {showSidePage2 && (
          <SidePage onClose={() => setShowSidePage2(false)}>
            <SidePage.Header>SidePage2Header</SidePage.Header>
            <SidePage.Body>
              <SidePage.Container>
                <div style={styleBodyWrapper}>
                  <div>Body</div>
                  {Actions}
                  {Menus}
                </div>
              </SidePage.Container>
            </SidePage.Body>
            <SidePage.Footer panel>{Menus}</SidePage.Footer>
          </SidePage>
        )}
      </StylesContainer>
    </div>
  );
  return (
    <>
      <div style={{ height: 500, width: '100%', backgroundColor: 'cyan' }}>CONTENT</div>
      <div>
        <Toggle onValueChange={setShadowDom}>shadowdom</Toggle>
      </div>
      {shadowDom ? <shadowRoot.div>shadow dom{Container}</shadowRoot.div> : <div>dom{Container}</div>}
    </>
  );
};
ModalScenarios.parameters = {
  creevey: { skip: true },
};
