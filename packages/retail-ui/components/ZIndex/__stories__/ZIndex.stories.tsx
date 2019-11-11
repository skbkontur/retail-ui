/* tslint:disable:jsx-no-lambda */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Gapped from '../../Gapped';
import Modal from '../../Modal';
import Loader from '../../Loader';
import Select from '../../Select';
import Kebab from '../../Kebab';
import MenuItem from '../../MenuItem';
import Center from '../../Center';
import Hint from '../../Hint';
import Tooltip from '../../Tooltip';
import ZIndex from '../ZIndex';
import Button from '../../Button';
import Toggle from '../../Toggle';
import Popup from '../../Popup/Popup';
import Toast from '../../Toast';
import Input from '../../Input';
import SidePage from '../../SidePage';
import { PopupPosition } from '../../Popup';

class ZKebab extends React.Component<{}> {
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

class ZSelect extends React.Component<{}> {
  public render() {
    return <Select value={1} items={[1, 2, 3, 4, 5, 6]} />;
  }
}

class ZLoader extends React.Component<{ size: number }> {
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

class ZModal extends React.Component<{ size: number; children?: React.ReactNode }> {
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

class LightboxUnderLightbox extends React.Component<{}> {
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

interface ZSampleState {
  modal: boolean;
  popup: boolean;
}

interface InputWithTooltipProps {
  text?: string;
  pos?: PopupPosition;
}

class ZSample extends React.Component<ZSampleProps, ZSampleState> {
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
        <Toast ref={e => (this.notifier = e)} />
        {controls}
        <Gapped>
          <ZLoader size={150} />
          <div ref={e => (this.popupAnchor = e)}>
            <Toggle checked={this.state.popup} onChange={v => this.setState({ popup: v })} />
          </div>
          {this.popupAnchor && (
            <Popup
              anchorElement={this.popupAnchor}
              positions={['left middle']}
              popupOffset={10}
              opened={this.state.popup}
              margin={5}
              hasShadow
              hasPin
              pinOffset={15}
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

class Demo extends React.Component<{}> {
  public render() {
    return (
      <div>
        {this.renderDiv('red', 200, 0, 0)}
        {this.renderDiv('green', 100, 20, 20)}
        {
          <ZIndex delta={500} render={false}>
            {this.renderDiv('blue', 100, 40, 40)}
          </ZIndex>
        }
        <ZIndex delta={400} render={false}>
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

const InputWithTooltip = ({ text = 'Hello', pos = 'top right' }: InputWithTooltipProps) => (
  <Tooltip render={() => text} trigger="opened" pos={pos}>
    <Input />
  </Tooltip>
);

const ModalWrapper = ({ caption = 'Title', ...props }: { caption?: string; children?: React.ReactChild }) => (
  <Modal>
    <Modal.Header>{caption}</Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer panel={true} />
  </Modal>
);

class LoaderCoversTooltip extends React.Component<{}> {
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

class ModalWithTooltipInLoader extends React.Component<{}> {
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

class TooltipNearLoader extends React.Component<{}> {
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

class NestedElementsInLoader extends React.Component<{}> {
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

class HintAndModal extends React.Component<{}> {
  public state = {
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
        <Modal.Footer panel={true}>
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
        <Hint text="Text" opened={this.state.hintOpened} manual={true}>
          <Button onClick={this.open}>Open</Button>
        </Hint>
      </div>
    );
  }
}

class LoaderInModal extends React.Component<{}> {
  public render() {
    return (
      <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <Loader active type="big">
            Body
          </Loader>
        </Modal.Body>
        <Modal.Footer panel={true}>Footer</Modal.Footer>
      </Modal>
    );
  }
}
interface TooltipAndDropdownMenuState {
  tooltipTrigger: 'closed' | 'opened';
}

class TooltipAndSelect extends React.Component<{}> {
  public state: TooltipAndDropdownMenuState = {
    tooltipTrigger: 'closed',
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
        <Tooltip render={tooltipRender} pos="bottom right" trigger={this.state.tooltipTrigger}>
          <Select
            onKeyDown={() => this.setState({ tooltipTrigger: 'opened' })}
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

class LoaderInSidePage extends React.Component<{}> {
  public render() {
    return (
      <SidePage onClose={close} blockBackground fromLeft={true}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                      60deg,
                      #fafafa,
                      #fafafa 20px,
                      #dfdede 20px,
                      #dfdede 40px
                    )`,
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
  }
}

class SidePageAndSelect extends React.Component<{}> {
  public state = {
    opened: false,
  };
  public renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground fromLeft={true}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                      60deg,
                      #fafafa,
                      #fafafa 20px,
                      #dfdede 20px,
                      #dfdede 40px
                    )`,
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

class BigModalWithLoader extends React.Component<{}> {
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

storiesOf('ZIndex', module)
  .add('LightboxUnderLightbox', () => <LightboxUnderLightbox />)
  .add('ZSample', () => <ZSample total={3} />)
  .add('Demo', () => <Demo />)
  .add('Loader covers tooltip', () => <LoaderCoversTooltip />)
  .add('Modal With Tooltip In Loader', () => <ModalWithTooltipInLoader />)
  .add('Nested elements in loader', () => <NestedElementsInLoader />)
  .add('Tooltip near Loader', () => <TooltipNearLoader />)
  .add('Hint and modal', () => <HintAndModal />)
  .add('Loader in Modal', () => <LoaderInModal />)
  .add('Big modal with Loader', () => <BigModalWithLoader />)
  .add('Tooltip and Select', () => <TooltipAndSelect />)
  .add('Loader in SidePage.Body', () => <LoaderInSidePage />)
  .add('Sidepage and Select', () => <SidePageAndSelect />);
