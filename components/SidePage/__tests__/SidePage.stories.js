// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import SidePage from '../SidePage';
import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Toggle from '../../Toggle';
import Modal from '../../Modal/Modal';

const textSample = (
  <p style={{ marginBottom: '100px' }}>
    On the other hand, we denounce with righteous indignation and dislike men
    who are so beguiled and demoralized by the charms of pleasure of the moment,
    so blinded by desire, that they cannot foresee the pain and trouble that are
    bound to ensue; and equal blame belongs to those who fail in their duty
    through weakness of will, which is the same as saying through shrinking from
    toil and pain. These cases are perfectly simple and easy to distinguish. In
    a free hour, when our power of choice is untrammelled and when nothing
    prevents our being able to do what we like best, every pleasure is to be
    welcomed and every pain avoided. But in certain circumstances and owing to
    the claims of duty or the obligations of business it will frequently occur
    that pleasures have to be repudiated and annoyances accepted. The wise man
    therefore always holds in these matters to this principle of selection: he
    rejects pleasures to secure other greater pleasures, or else he endures
    pains to avoid worse pains.
  </p>
);

type SampleProps = {
  total?: number,
  current: number,
  ignoreBackgroundClick?: boolean,
  blockBackground?: boolean
};

type SampleState = {
  open: boolean,
  panel: boolean
};

class Sample extends React.Component<SampleProps, SampleState> {
  state = {
    open: false,
    panel: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  renderSidePage = () => (
    <SidePage
      onClose={this.close}
      ignoreBackgroundClick={this.props.ignoreBackgroundClick}
      blockBackground={this.props.blockBackground}
    >
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        {this.props.total &&
          this.props.total > this.props.current && (
            <Sample
              current={this.props.current + 1}
              total={this.props.total}
              ignoreBackgroundClick={this.props.ignoreBackgroundClick}
              blockBackground={this.props.blockBackground}
            />
          )}
        <div>
          <Toggle
            checked={this.state.panel}
            onChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
          />{' '}
          Panel {this.state.panel ? 'enabled' : 'disabled'}
        </div>
        {textSample}
        {textSample}
      </SidePage.Body>
      <SidePage.Footer panel={this.state.panel}>
        <Button onClick={this.close}>Close</Button>
      </SidePage.Footer>
    </SidePage>
  );

  render = () => (
    <div>
      {this.state.open && this.renderSidePage()}
      <Button onClick={this.open}>Open SidePage</Button>
    </div>
  );
}

class SidePageWithScrollableContent extends Component<{}, {}> {
  render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample total={1} current={1} ignoreBackgroundClick />
        {textSample}
        {textSample}
      </div>
    );
  }
}

class SidePageWithInputInHeader extends Component<{}, { opened: boolean }> {
  state = {
    opened: false
  };

  render() {
    const sidePage = (
      <SidePage onClose={this.close}>
        <SidePage.Header>
          <Input placeholder="Some input placeholder..." value="" />{' '}
          <Input
            size="large"
            placeholder="Some large input placeholder..."
            value=""
          />
          <br />
          <Textarea placeholder="Some textarea placeholder" value="" />
        </SidePage.Header>
        <SidePage.Body>
          <p>
            A lotta people ask me where the fuck I've been at the last few
            years.
          </p>
        </SidePage.Body>
      </SidePage>
    );

    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && sidePage}
        <Button onClick={this.open}>Open side page</Button>
      </div>
    );
  }

  open = () => {
    this.setState({ opened: true });
  };

  close = () => {
    this.setState({ opened: false });
  };
}

class SidePageOverAnotherSidePage extends Component<{}, *> {
  render() {
    return (
      <Sample current={1} total={5} ignoreBackgroundClick blockBackground />
    );
  }
}

class SidePageWithCloseConfiguration extends Component<
  {},
  {
    ignoreBackgroundClick: boolean,
    blockBackground: boolean
  }
> {
  state = {
    ignoreBackgroundClick: false,
    blockBackground: false
  };

  render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample
          total={1}
          current={1}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
        />
        <div>
          <Toggle
            checked={this.state.ignoreBackgroundClick}
            onChange={() =>
              this.setState(({ ignoreBackgroundClick }) => ({
                ignoreBackgroundClick: !ignoreBackgroundClick
              }))
            }
          />{' '}
          ignoreBackgroundClick{' '}
          {this.state.ignoreBackgroundClick ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle
            checked={this.state.blockBackground}
            onChange={() =>
              this.setState(({ blockBackground }) => ({
                blockBackground: !blockBackground
              }))
            }
          />{' '}
          blockBackground {this.state.blockBackground ? 'enabled' : 'disabled'}
        </div>
      </div>
    );
  }
}

class SidePageWithModalInside extends Component<
  {},
  {
    isModalOpened: boolean,
    isSidePageOpened: boolean
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isModalOpened: false,
      isSidePageOpened: false
    };
  }

  render() {
    return (
      <div>
        {this.state.isModalOpened && this.renderModal()}
        {this.state.isSidePageOpened && this.renderSidePage()}
        <Button onClick={() => this.setState({ isSidePageOpened: true })}>
          Открыть sidepage
        </Button>
        {textSample}
        {textSample}
      </div>
    );
  }

  renderModal = () => (
    <Modal
      onClose={() => this.setState({ isModalOpened: false })}
      ignoreBackgroundClick
    >
      <Modal.Header>Хедер</Modal.Header>
    </Modal>
  );

  renderSidePage = () => (
    <SidePage
      onClose={() => this.setState({ isSidePageOpened: false })}
      ignoreBackgroundClick
    >
      <SidePage.Body>
        <Button onClick={() => this.setState({ isModalOpened: true })}>
          Открыть modal
        </Button>
      </SidePage.Body>
    </SidePage>
  );
}

storiesOf('SidePage', module)
  .add('With scrollable parent content', () => (
    <SidePageWithScrollableContent />
  ))
  .add('With Input in header', () => <SidePageWithInputInHeader />)
  .add('SidePage over another SidePage', () => <SidePageOverAnotherSidePage />)
  .add('SidePage with configuration', () => <SidePageWithCloseConfiguration />)
  .add('SidePage with Modal', () => <SidePageWithModalInside />)
  .add('Disabled SidePage', () => (
    <SidePage disableClose>
      <SidePage.Header>Disabled</SidePage.Header>
      <SidePage.Body>Content of disabled body</SidePage.Body>
    </SidePage>
  ));
