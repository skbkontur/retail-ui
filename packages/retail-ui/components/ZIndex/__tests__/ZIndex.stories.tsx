
/* eslint-disable react/no-multi-comp */
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
                Content<br />under<br />loader
              </b>
            </Center>
          </div>
        </Loader>
      </div>
    );
  }
}

class ZModal extends React.Component<{ size: number; children?: React.Node }> {
  public render() {
    const size = this.props.size + 'px';
    return (
      <Modal>
        <Modal.Body>
          <div style={{ minWidth: size, minHeight: size }}>
            {this.props.children}
          </div>
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

class ZSample extends React.Component<ZSampleProps, ZSampleState> {
  public state = {
    modal: false,
    popup: false
  };

  public popupAnchor: HTMLElement | null;
  public notifier: Toast | null;

  public render() {
    const controls = (
      <Gapped>
        <Tooltip
          render={() => this.renderBlock('TOOLTIP', 150)}
          trigger={'hover'}
        >
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
            <Toggle
              checked={this.state.popup}
              onChange={v => this.setState({ popup: v })}
            />
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
          {current < total && (
            <Button onClick={() => this.setState({ modal: true })}>
              MODAL
            </Button>
          )}
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
    return (
      <Center style={{ width, height: height || width }}>{content}</Center>
    );
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

  public renderDiv(background, zIndex, left, top) {
    return (
      <div
        style={{
          height: '100px',
          width: '100px',
          background,
          position: 'absolute',
          zIndex,
          left,
          top
        }}
      />
    );
  }
}

storiesOf('ZIndex', module)
  .add('LightboxUnderLightbox', () => <LightboxUnderLightbox />)
  .add('ZSample', () => <ZSample total={3} />)
  .add('Demo', () => <Demo />);
