import React from 'react';
import ReactDOM from 'react-dom';

import { Dropdown } from '../../../components/Dropdown';
import { Story } from '../../../typings/stories';
import { Gapped } from '../../../components/Gapped';
import { Modal } from '../../../components/Modal';
import { Loader } from '../../../components/Loader';
import { Select } from '../../../components/Select';
import { Kebab } from '../../../components/Kebab';
import { MenuItem } from '../../../components/MenuItem';
import { Center } from '../../../components/Center';
import { Hint, HintProps } from '../../../components/Hint';
import { Tooltip, TooltipTrigger } from '../../../components/Tooltip';
import { ZIndex } from '../ZIndex';
import { Button } from '../../../components/Button';
import { Toggle } from '../../../components/Toggle';
import { Popup, PopupPositionsType } from '../../Popup';
import { Toast } from '../../../components/Toast';
import { Input } from '../../../components/Input';
import { SidePage } from '../../../components/SidePage';
import { ToastView } from '../../../components/Toast/ToastView';
import { LoaderAndButton } from '../../../components/Loader/__stories__/LoaderAndButton';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { Sticky } from '../../../components/Sticky';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { SingleToast } from '../../../components/SingleToast';

const linearLightGradient = `repeating-linear-gradient(
                                60deg,
                                #fafafa,
                                #fafafa 20px,
                                #dfdede 20px,
                                #dfdede 40px
                              )`;
const linearDarkGradient = `repeating-linear-gradient(
                                60deg,
                                #868b8e,
                                #868b8e 20px,
                                #444 20px,
                                #444 40px
                              )`;

class ZKebab extends React.Component {
  public render() {
    return (
      <Kebab>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
        <MenuItem>4</MenuItem>
        <MenuItem>5</MenuItem>
        <MenuItem>6</MenuItem>
      </Kebab>
    );
  }
}

class ZSelect extends React.Component {
  public render() {
    return <Select value={1} items={[1, 2, 3, 4, 5, 6]} />;
  }
}

interface ZLoaderProps {
  size: number;
}
class ZLoader extends React.Component<ZLoaderProps> {
  public render() {
    const size = this.props.size + 'px';
    const style = { height: size, fontSize: '20px', border: 'solid red 1px' };
    return (
      <div style={{ width: size }}>
        <Loader active>
          <div style={style}>
            <Center>
              <b>
                Content
                <br />
                under
                <br />
                loader
              </b>
            </Center>
          </div>
        </Loader>
      </div>
    );
  }
}

interface ZModalProps {
  size: number;
  children?: React.ReactNode;
}
class ZModal extends React.Component<ZModalProps> {
  public render() {
    const size = this.props.size + 'px';
    return (
      <Modal>
        <Modal.Body>
          <div style={{ minWidth: size, minHeight: size }}>{this.props.children}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

class LightboxUnderLightbox extends React.Component {
  public render() {
    return (
      <div>
        <ZModal size={200}>xxx</ZModal>
        <ZModal size={100}>zzz</ZModal>
      </div>
    );
  }
}

interface ZSampleProps {
  total?: number;
  current?: number;
}

class ZSample extends React.Component<ZSampleProps> {
  public state = {
    modal: false,
    popup: false,
  };

  private popupAnchor: HTMLElement | null = null;
  private notifier: Toast | null = null;

  public render(): React.ReactNode {
    const controls = (
      <Gapped>
        <Tooltip render={() => this.renderBlock('TOOLTIP', 150)} trigger={'hover'}>
          T
        </Tooltip>
        <Hint text={this.renderBlock('HINT', 150)}>H</Hint>
        <ZSelect />
        <ZKebab />
      </Gapped>
    );
    const { total = 0, current = 0 } = this.props;
    return (
      <Gapped vertical>
        <Toast ref={(e) => (this.notifier = e)} />
        {controls}
        <Gapped>
          <ZLoader size={150} />
          <div ref={(e) => (this.popupAnchor = e)}>
            <Toggle checked={this.state.popup} onValueChange={(v) => this.setState({ popup: v })} />
          </div>
          {this.popupAnchor && (
            <Popup
              anchorElement={this.popupAnchor}
              positions={['left middle']}
              popupOffset={10}
              opened={this.state.popup}
              hasShadow
              hasPin
            >
              {this.renderBlock('POPUP POPUP POPUP', 300, 50)}
            </Popup>
          )}
        </Gapped>
        {controls}
        <Gapped gap={10}>
          <Button onClick={() => this.notify(current)}>TOAST</Button>
          {current < total && <Button onClick={() => this.setState({ modal: true })}>MODAL</Button>}
        </Gapped>
        {this.state.modal && (
          <Modal onClose={() => this.setState({ modal: false })}>
            <Modal.Header>M #{current}</Modal.Header>
            <Modal.Body>
              <div style={{ width: 200 * (total - current) }}>
                <ZSample total={total} current={current + 1} />
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Gapped>
    );
  }

  public notify(value: number) {
    if (this.notifier) {
      this.notifier.push('Message from #' + value);
    }
  }

  public renderBlock(content: React.ReactNode, width: number, height?: number) {
    return <Center style={{ width, height: height || width }}>{content}</Center>;
  }
}

class Demo extends React.Component {
  public render() {
    return (
      <div>
        {this.renderDiv('red', 200, 0, 0)}
        {this.renderDiv('green', 100, 20, 20)}
        {
          <ZIndex delta={500} applyZIndex={false}>
            {this.renderDiv('blue', 100, 40, 40)}
          </ZIndex>
        }
        <ZIndex delta={400} applyZIndex={false}>
          <ZIndex delta={200} style={{ position: 'absolute' }}>
            {this.renderDiv('orange', 100, 40, 40)}
          </ZIndex>
        </ZIndex>
        <ZIndex delta={300} style={{ position: 'absolute' }}>
          {this.renderDiv('black', 100, 60, 60)}
        </ZIndex>
      </div>
    );
  }

  public renderDiv(background: string, zIndex: number, left: number, top: number) {
    return (
      <div
        style={{
          height: '100px',
          width: '100px',
          background,
          position: 'absolute',
          zIndex,
          left,
          top,
        }}
      />
    );
  }
}

interface InputWithTooltipProps {
  text?: string;
  pos?: PopupPositionsType;
}

const InputWithTooltip = ({ text = 'Hello', pos = 'top right' }: InputWithTooltipProps) => (
  <Tooltip render={() => text} trigger="opened" pos={pos}>
    <Input />
  </Tooltip>
);

const ModalWrapper = ({ caption = 'Title', ...props }: { caption?: string; children?: React.ReactChild }) => (
  <Modal>
    <Modal.Header>{caption}</Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer panel />
  </Modal>
);

class LoaderCoversTooltip extends React.Component {
  public render() {
    return (
      <div style={{ width: '500px' }}>
        <Loader type="big" active>
          <div style={{ height: 100 }} />
          <InputWithTooltip />
        </Loader>
      </div>
    );
  }
}

class ModalWithTooltipInLoader extends React.Component {
  public render() {
    return (
      <Loader type="big" active>
        <div style={{ width: '100vw', height: '100vh' }}>
          <ModalWrapper>
            <InputWithTooltip />
          </ModalWrapper>
        </div>
      </Loader>
    );
  }
}

class TooltipNearLoader extends React.Component {
  public render() {
    return (
      <div style={{ display: 'flex', width: 500, paddingBottom: 10 }}>
        <Loader type="normal" active>
          <div style={{ height: 100, width: 250 }} />
          <InputWithTooltip />
        </Loader>
        <div style={{ marginTop: 100 }}>
          <InputWithTooltip text={'World'} pos="left middle" />
        </div>
      </div>
    );
  }
}

class NestedElementsInLoader extends React.Component {
  public renderNestedModal() {
    return (
      <ModalWrapper caption="Second Modal Title">
        <InputWithTooltip text={'World'} pos="top right" />
      </ModalWrapper>
    );
  }

  public render() {
    return (
      <Loader type="big" active>
        <div style={{ width: '100vw', height: '100vh' }}>
          <ModalWrapper caption="First Modal Title">
            <div>
              <InputWithTooltip text={'World'} pos="top right" />
              {this.renderNestedModal()}
              <Button>Open modal</Button>
            </div>
          </ModalWrapper>
        </div>
      </Loader>
    );
  }
}

interface HintAndModalState {
  modalOpened: boolean;
  hintOpened: HintProps['opened'];
}
class HintAndModal extends React.Component {
  public state: HintAndModalState = {
    modalOpened: false,
    hintOpened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <div className="modalBody">
            <p>
              Use rxjs operators with react hooks. Use rxjs operators with react hooksUse rxjs operators with react
              hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
              hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
              hooks
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button onClick={() => this.setState({ hintOpened: true })}>Show Hint</Button>
          </div>
        </Modal.Body>
        <Modal.Footer panel>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public open = () => {
    this.setState({ modalOpened: true });
  };

  public close = () => {
    this.setState({ modalOpened: false });
  };

  public render() {
    return (
      <div style={{ padding: '100px' }}>
        {this.state.modalOpened && this.renderModal()}
        <Hint text="Text" opened={this.state.hintOpened} manual>
          <Button onClick={this.open} data-tid="open-modal">
            Open
          </Button>
        </Hint>
      </div>
    );
  }
}

interface TooltipAndDropdownMenuState {
  trigger: TooltipTrigger;
}
class TooltipAndSelect extends React.Component {
  public state: TooltipAndDropdownMenuState = {
    trigger: 'closed',
  };

  public render() {
    const tooltipRender = () => (
      <div
        style={{
          width: 250,
          fontSize: 14,
          fontFamily: 'Segoe UI',
        }}
      >
        Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и
        модернизации форм развития.
      </div>
    );

    return (
      <div className="container" style={{ height: '300px', width: '300px' }}>
        <Tooltip render={tooltipRender} pos="bottom right" trigger={this.state.trigger}>
          <Select
            onKeyDown={() => this.setState({ trigger: 'opened' })}
            width={120}
            value={'small'}
            items={['small', 'medium', 'large']}
            size={'small'}
          />
        </Tooltip>
      </div>
    );
  }
}

class LoaderInSidePage extends React.Component {
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <SidePage onClose={close} blockBackground fromLeft>
              <SidePage.Header>Title</SidePage.Header>
              <SidePage.Body>
                <div
                  style={{
                    background: theme.prototype.constructor.name.includes('Dark')
                      ? '' + linearDarkGradient + ''
                      : '' + linearLightGradient + '',
                    height: 600,
                    padding: '20px 0',
                  }}
                >
                  <SidePage.Container>
                    <ZLoader size={800} />
                  </SidePage.Container>
                </div>
              </SidePage.Body>
              <SidePage.Footer panel>
                <Button>Close</Button>
              </SidePage.Footer>
            </SidePage>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

class SidePageAndSelect extends React.Component {
  public state = {
    opened: false,
  };
  public renderSidePage() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <SidePage onClose={close} blockBackground fromLeft>
              <SidePage.Header>Title</SidePage.Header>
              <SidePage.Body>
                <div
                  style={{
                    background: theme.prototype.constructor.name.includes('Dark')
                      ? '' + linearDarkGradient + ''
                      : '' + linearLightGradient + '',
                    height: 600,
                    padding: '20px 0',
                  }}
                >
                  <SidePage.Container>
                    <div className="sidepage-select-continer" style={{ display: 'flex', justifyContent: 'center' }}>
                      <TooltipAndSelect />
                    </div>
                  </SidePage.Container>
                </div>
              </SidePage.Body>
              <SidePage.Footer panel>
                <Button onClick={this.close}>Close</Button>
              </SidePage.Footer>
            </SidePage>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };

  public render() {
    return (
      <div>
        <div className="select-container">
          <TooltipAndSelect />
        </div>
        {this.state.opened && this.renderSidePage()}
        <div className="open-sidepage-container">
          <Button onClick={this.open}>Open</Button>
        </div>
      </div>
    );
  }
}

class BigModalWithLoader extends React.Component {
  public render() {
    return (
      <Modal>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>
          <ZLoader size={800} />
          <p style={{ height: 2000 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fuga, officia magnam dolore quas debitis tenetur
            animi iste ea sunt atque nobis velit rerum dolor voluptatibus sit? Facere, doloribus modi!
          </p>
        </Modal.Body>
        <Modal.Footer panel>
          <Button>Ок</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function ToastAndLoader() {
  return (
    <div>
      <ToastView>Changes saved</ToastView>
      <LoaderAndButton active />
    </div>
  );
}

class ElementsInLoaderInModal extends React.Component {
  public state = { active: false };
  public render() {
    const { active } = this.state;
    return (
      <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <Loader active={active}>
            <div style={{ padding: '100px' }}>
              <Hint text={'Test'} manual opened>
                <Gapped gap={10}>
                  <Select placeholder="Выбрать..." items={['Раз', 'Два', 'Три']} />
                  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
                    <MenuItem>Раз</MenuItem>
                    <MenuItem>Два</MenuItem>
                    <MenuItem>Три</MenuItem>
                  </DropdownMenu>
                </Gapped>
              </Hint>
            </div>
          </Loader>
        </Modal.Body>
        <Modal.Footer>
          <Toggle checked={active} onValueChange={this.setActive} /> Активировать
        </Modal.Footer>
      </Modal>
    );
  }

  private setActive = (active: boolean) => this.setState({ active });
}

class LoaderAndSidePage extends React.Component {
  public state = { active: false };
  public render() {
    const { active } = this.state;
    return (
      <div>
        <SidePage blockBackground>
          <SidePage.Header>Title</SidePage.Header>
          <SidePage.Body>
            <SidePage.Container>
              <p>Use rxjs operators with react hooks</p>
            </SidePage.Container>
          </SidePage.Body>
          <SidePage.Footer panel>
            <Toggle checked={active} onValueChange={this.setActive} /> Активировать
          </SidePage.Footer>
        </SidePage>
        <Loader active={active}>
          <div style={{ padding: '100px' }}>
            <Button>Open</Button>
          </div>
        </Loader>
      </div>
    );
  }
  private setActive = (active: boolean) => this.setState({ active });
}

function ModalInLoaderAndModal() {
  return (
    <div>
      <Loader active={false}>
        <Modal>
          <Modal.Header>1</Modal.Header>
          <Modal.Body>
            <p>Ехал модал через реку</p>
            <p>Видит модал в реке модал</p>
            <p>Cунул модал модал в модал</p>
            <p>Модал модал модал модал</p>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
      </Loader>

      <Modal>
        <Modal.Header>2</Modal.Header>
        <Modal.Body>
          Ехал модал через реку, видит модал в реке модал, сунул модал модал в модал, модал модал модал модал
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function StickyAndLoader() {
  return (
    <>
      <Loader type="big" active>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <p>Ехал лоадер через реку</p>
            <p>Видит лоадер в реке стики</p>
            <p>Cунул лоадер лоадер в стики</p>
            <p>Стики лоадер лоадер стики</p>
            <hr />
          </div>
        ))}
        <Sticky side="bottom" offset={40}>
          <p style={{ background: '#f99' }}>I&apos;m Sticky inside Loader</p>
        </Sticky>
      </Loader>
      <Sticky side="bottom">
        <p style={{ background: '#f99' }}>Sticky outsider</p>
      </Sticky>
    </>
  );
}

function StickyAndTooltips() {
  return (
    <div style={{ width: '500px' }}>
      <div style={{ height: '120vh', position: 'relative', padding: '20px' }}>
        <div style={{ position: 'absolute', bottom: '50vh' }}>
          <Tooltip trigger="opened" pos="right top" render={() => <div style={{ lineHeight: '20vh' }}>Click me!</div>}>
            <Select placeholder="Choose..." items={['One', 'Two', 'Three']} />
          </Tooltip>
        </div>
      </div>
      <Sticky side="bottom">
        <div style={{ padding: '4vh 20px', width: '100%', background: '#e9e9e9' }}>
          <Tooltip trigger="opened" pos="right middle" render={() => "I'm inside Sticky"}>
            <Button>Close</Button>
          </Tooltip>
        </div>
      </Sticky>
    </div>
  );
}

export default { title: 'ZIndex' };

export const LightboxUnderLightboxStory = () => <LightboxUnderLightbox />;
LightboxUnderLightboxStory.storyName = 'LightboxUnderLightbox';
LightboxUnderLightboxStory.parameters = { creevey: { skip: true } };

export const ZSampleStory = () => <ZSample total={3} />;
ZSampleStory.storyName = 'ZSample';
ZSampleStory.parameters = { creevey: { skip: true } };

export const DemoStory = () => <Demo />;
DemoStory.storyName = 'Demo';
DemoStory.parameters = { creevey: { skip: true } };

export const LoaderCoversTooltipStory = () => <LoaderCoversTooltip />;
LoaderCoversTooltipStory.storyName = 'Loader covers tooltip';

export const ModalWithTooltipInLoaderStory: Story = () => <ModalWithTooltipInLoader />;
ModalWithTooltipInLoaderStory.storyName = 'Modal With Tooltip In Loader';
ModalWithTooltipInLoaderStory.parameters = { creevey: { captureElement: null } };

export const NestedElementsInLoaderStory: Story = () => <NestedElementsInLoader />;
NestedElementsInLoaderStory.storyName = 'Nested elements in loader';
NestedElementsInLoaderStory.parameters = { creevey: { captureElement: null } };

export const TooltipNearLoaderStory = () => <TooltipNearLoader />;
TooltipNearLoaderStory.storyName = 'Tooltip near Loader';

export const HintAndModalStory: Story = () => <HintAndModal />;
HintAndModalStory.storyName = 'Hint and modal';

export const BigModalWithLoaderStory: Story = () => <BigModalWithLoader />;
BigModalWithLoaderStory.storyName = 'Big modal with Loader';

export const TooltipAndSelectStory: Story = () => <TooltipAndSelect />;
TooltipAndSelectStory.storyName = 'Tooltip and Select';

export const LoaderInSidePageBody: Story = () => <LoaderInSidePage />;
LoaderInSidePageBody.storyName = 'Loader in SidePage.Body';

export const SidepageAndSelect: Story = () => <SidePageAndSelect />;
SidepageAndSelect.storyName = 'Sidepage and Select';

export const ToastAndLoaderStory = () => <ToastAndLoader />;
ToastAndLoaderStory.storyName = 'Toast and Loader';

export const ElementsInLoaderInModalStory: Story = () => <ElementsInLoaderInModal />;
ElementsInLoaderInModalStory.storyName = 'Elements in Loader in Modal';

export const LoaderAndSidePageStory: Story = () => <LoaderAndSidePage />;
LoaderAndSidePageStory.storyName = 'Loader and SidePage';

export const ModalInLoaderAndModalStory: Story = () => <ModalInLoaderAndModal />;
ModalInLoaderAndModalStory.storyName = 'Modal in Loader and Modal';
ModalInLoaderAndModalStory.parameters = { creevey: { captureElement: null } };

export const StickyAndLoaderStory: Story = () => <StickyAndLoader />;
StickyAndLoaderStory.storyName = 'Sticky and Loader';
StickyAndLoaderStory.parameters = { creevey: { captureElement: null } };

export const StickyAndTooltipsStory: Story = () => <StickyAndTooltips />;
StickyAndTooltipsStory.storyName = 'Sticky and Tooltips';

export const ModalSidePageStack = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isSidePanelOpen, setSidePanelOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Modal.Body>
            <div style={{ height: 300, width: 200, background: 'lightgrey' }} />
            <button onClick={() => setSidePanelOpen(true)}>Open Side Page</button>
          </Modal.Body>
        </Modal>
      )}

      {isSidePanelOpen && <SidePage onClose={() => setSidePanelOpen(false)}></SidePage>}
    </div>
  );
};
ModalSidePageStack.storyName = 'Modal and SidePage Stack';
ModalSidePageStack.parameters = { creevey: { skip: true } };

export const ModalAndToast: Story = () => {
  const toast = React.useRef<Toast>(null);
  const showNotification = () => {
    if (toast.current) {
      toast.current.push('Toast');
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <Modal>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <Button onClick={showNotification}>Show Toast</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const ToastOverEverything: Story = () => {
  const toast = React.useRef<Toast>(null);
  const showRefToast = () => {
    if (toast.current) {
      toast.current.push('Toast via Ref');
    }
  };

  return (
    <SidePage>
      <SidePage.Body>
        <SidePage.Header>SidePage</SidePage.Header>
        <Modal>
          <Modal.Header>Modal</Modal.Header>
          <Modal.Body>
            <Toast ref={toast} />
            <button data-tid="ref-toast" onClick={showRefToast}>
              Ref Toast
            </button>
            <SingleToast />
            <button
              data-tid="static-toast"
              onClick={() => SingleToast.push('Static Toast', { label: 'Close', handler: SingleToast.close })}
            >
              Static Toast
            </button>
          </Modal.Body>
        </Modal>
      </SidePage.Body>
    </SidePage>
  );
};

export const ModalWithDropdown: Story = () => {
  return (
    <Modal width={350}>
      <Modal.Header style={{ background: 'green' }}>Header</Modal.Header>
      <Modal.Body>
        <div style={{ height: '50px' }} />
        <Dropdown
          data-tid="dropdown_top"
          menuPos="top"
          caption={'Open'}
          size="medium"
          width="50%"
          menuWidth="250px"
          disablePortal
        >
          <div style={{ height: '150px', backgroundColor: 'lightblue', overflow: 'hidden' }}>
            <p>{'выпадашка '.repeat(100)}</p>
          </div>
        </Dropdown>
        <div style={{ height: '400px' }} />
        <Dropdown
          data-tid="dropdown_bottom"
          menuPos="bottom"
          caption={'Open'}
          size="medium"
          width="50%"
          menuWidth="250px"
          disablePortal
        >
          <div style={{ height: '150px', backgroundColor: 'lightblue', overflow: 'hidden' }}>
            <p>{'выпадашка '.repeat(100)}</p>
          </div>
        </Dropdown>
        <div style={{ height: '50px' }} />
      </Modal.Body>
      <Modal.Footer style={{ background: 'green' }}>Footer</Modal.Footer>
    </Modal>
  );
};

function Root({ children }: React.PropsWithChildren<any>) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (rootRef.current) {
      const App = () => children;
      children &&
        ReactDOM.render(
          <ThemeContext.Provider value={theme}>
            <App />
          </ThemeContext.Provider>,
          rootRef.current,
        );
    }
  }, []);

  React.useLayoutEffect(
    () => () => {
      rootRef.current && ReactDOM.unmountComponentAtNode(rootRef.current);
    },
    [],
  );

  return <div ref={rootRef} style={{ display: 'inline-block' }} />;
}

function Classic({ withRoot = false }) {
  const selectRef = React.useRef<Select>(null);
  React.useEffect(() => {
    selectRef.current?.open();
  }, []);

  const title = withRoot ? 'новый root' : 'текущий root';
  const MayBeRoot = withRoot ? Root : ({ children }: React.PropsWithChildren<any>) => children;

  return (
    <div style={{ display: 'flex', columnGap: 100, flexDirection: 'column', paddingBottom: 50 }}>
      <div>
        <Tooltip render={() => 'Tooltip 1'} pos="bottom center" trigger="opened" allowedPositions={['bottom center']}>
          Тултип
        </Tooltip>
        <br />
        <Select
          ref={selectRef}
          width="120px"
          items={[123]}
          renderItem={() => (
            <MayBeRoot>
              <Tooltip
                render={() => 'Tooltip 2'}
                pos="right middle"
                trigger="opened"
                allowedPositions={['right middle']}
              >
                {title}
              </Tooltip>
            </MayBeRoot>
          )}
        />
      </div>
    </div>
  );
}

function ActiveLoader({ withRoot = false }) {
  const title = withRoot ? 'новый root' : 'текущий root';
  const MayBeRoot = withRoot ? Root : ({ children }: React.PropsWithChildren<any>) => children;

  return (
    <div style={{ display: 'flex', columnGap: 100, flexDirection: 'column' }}>
      <div
        style={{
          width: 200,
          background: '#eee',
          padding: 10,
        }}
      >
        <MayBeRoot>
          <Loader active caption={null}>
            <div style={{ minWidth: 200 }}>
              {title}
              <Classic />
            </div>
          </Loader>
        </MayBeRoot>
      </div>
    </div>
  );
}

function DisabledLoaderInPortal({ withRoot = false }) {
  const title = withRoot ? 'новый root' : 'текущий root';
  const MayBeRoot = withRoot ? Root : ({ children }: React.PropsWithChildren<any>) => children;

  return (
    <div style={{ display: 'flex', columnGap: 100, flexDirection: 'column' }}>
      <div
        style={{
          width: 200,
          height: 140,
          background: '#eee',
          padding: 10,
        }}
      >
        <Popup opened anchorElement={<div />} pos="bottom left" priority="Modal">
          <MayBeRoot>
            <Loader caption={null}>
              <div style={{ minWidth: 200 }}>
                {title}
                <Classic />
              </div>
            </Loader>
          </MayBeRoot>
        </Popup>
      </div>
    </div>
  );
}

function Upper({ withRoot = false }) {
  const title = withRoot ? 'новый root' : 'текущий root';
  const MayBeRoot = withRoot ? Root : ({ children }: React.PropsWithChildren<any>) => children;

  return (
    <div style={{ display: 'flex', rowGap: 200, flexDirection: 'column', minWidth: 100 }}>
      <div>
        <Tooltip
          render={() => (
            <Tooltip
              render={() => (
                <Tooltip
                  render={() => 'Tooltip 3'}
                  pos="bottom left"
                  trigger="opened"
                  allowedPositions={['bottom left']}
                >
                  Tooltip 2
                </Tooltip>
              )}
              pos="bottom left"
              trigger="opened"
              allowedPositions={['bottom left']}
            >
              Tooltip 1
            </Tooltip>
          )}
          pos="bottom left"
          trigger="opened"
          allowedPositions={['bottom left']}
        />
      </div>

      <ZIndex priority={9001}>
        <MayBeRoot>
          <Tooltip render={() => 'Tooltip'} pos="top center" trigger="opened" allowedPositions={['top center']}>
            {title}
          </Tooltip>
        </MayBeRoot>
      </ZIndex>
    </div>
  );
}

const SeveralRoots = (props: { title: string; goldenSample: React.ReactNode; withRoot: React.ReactNode }) => {
  return (
    <div style={{ padding: 50, display: 'flex', flexDirection: 'column', rowGap: 20, width: 600 }}>
      <h3 style={{ textAlign: 'center' }}>{props.title}</h3>
      <div style={{ display: 'flex', columnGap: 150, justifyContent: 'space-evenly' }}>
        <h3>Эталон</h3>
        <h3>Root</h3>
      </div>
      <div style={{ display: 'flex', columnGap: 150, justifyContent: 'space-evenly' }}>
        {props.goldenSample}
        {props.withRoot}
      </div>
    </div>
  );
};

export const SeveralRootsSimple = () => {
  return <SeveralRoots title="Простой пример" goldenSample={<Classic />} withRoot={<Classic withRoot />} />;
};
SeveralRootsSimple.parameters = { creevey: { skip: { 'enough basic theme': { in: /^(?!\bchrome2022\b)/ } } } };

export const SeveralRootsActiveLoader = () => {
  return <SeveralRoots title="Активный Лоадер" goldenSample={<ActiveLoader />} withRoot={<ActiveLoader withRoot />} />;
};
SeveralRootsActiveLoader.parameters = { creevey: { skip: { 'enough basic theme': { in: /^(?!\bchrome2022\b)/ } } } };

export const SeveralRootsDisabledLoaderInPortal = () => {
  return (
    <SeveralRoots
      title="Неактивный Лоадер в Портале"
      goldenSample={<DisabledLoaderInPortal />}
      withRoot={<DisabledLoaderInPortal withRoot />}
    />
  );
};
SeveralRootsDisabledLoaderInPortal.parameters = {
  creevey: { skip: { 'enough basic theme': { in: /^(?!\bchrome2022\b)/ } } },
};

export const SeveralRootsUpper = () => {
  return <SeveralRoots title="Выше всех" goldenSample={<Upper />} withRoot={<Upper withRoot />} />;
};
SeveralRootsUpper.parameters = { creevey: { skip: { 'enough basic theme': { in: /^(?!\bchrome2022\b)/ } } } };
