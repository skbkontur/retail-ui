
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
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
  children?: React.Node,
  total?: number,
  current: number,
  ignoreBackgroundClick?: boolean,
  blockBackground?: boolean,
  withContent?: boolean
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
      width={785}
      onClose={this.close}
      ignoreBackgroundClick={this.props.ignoreBackgroundClick}
      blockBackground={this.props.blockBackground}
    >
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <div style={{ padding: '0 35px 35px 35px' }}>
          {this.props.total &&
            this.props.total > this.props.current && (
              <Sample
                current={this.props.current + 1}
                total={this.props.total}
                ignoreBackgroundClick={this.props.ignoreBackgroundClick}
                withContent={this.props.withContent}
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
          {this.props.children}
          {this.props.withContent && (
            <div>
              {textSample}
              {textSample}
            </div>
          )}
        </div>
      </SidePage.Body>
      <SidePage.Footer panel={this.state.panel}>
        <Button size="large" onClick={this.close}>
          Close
        </Button>
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

type SampleConfiguratorProps = {
  ignoreBackgroundClick: boolean,
  blockBackground: boolean,
  withContent: boolean,
  onChange: (name: string) => void
};

class SampleConfigurator extends React.Component<SampleConfiguratorProps> {
  render() {
    return (
      <div>
        <div>
          <Toggle
            checked={this.props.ignoreBackgroundClick}
            onChange={() => this.props.onChange('ignoreBackgroundClick')}
          />{' '}
          ignoreBackgroundClick{' '}
          {this.props.ignoreBackgroundClick ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle
            checked={this.props.blockBackground}
            onChange={() => this.props.onChange('blockBackground')}
          />{' '}
          blockBackground {this.props.blockBackground ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle
            checked={this.props.withContent}
            onChange={() => this.props.onChange('withContent')}
          />{' '}
          withContent {this.props.withContent ? 'enabled' : 'disabled'}
        </div>
      </div>
    );
  }
}

class SidePageWithScrollableContent extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample total={1} current={1} ignoreBackgroundClick withContent />
        {textSample}
        {textSample}
      </div>
    );
  }
}

class SidePageWithInputInHeader extends React.Component<
  {},
  { opened: boolean }
> {
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
          <p style={{ marginLeft: 30 }}>
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

class SidePageOverAnotherSidePage extends React.Component<{}, *> {
  render() {
    return (
      <Sample
        current={1}
        total={5}
        ignoreBackgroundClick
        blockBackground
        withContent
      />
    );
  }
}

class SidePageWithCloseConfiguration extends React.Component<
  {},
  {
    ignoreBackgroundClick: boolean,
    blockBackground: boolean,
    withContent: boolean
  }
> {
  state = {
    ignoreBackgroundClick: false,
    blockBackground: false,
    withContent: false
  };

  render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample
          total={1}
          current={1}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
          withContent={this.state.withContent}
        />
        <SampleConfigurator
          onChange={name => this.setState(state => ({ [name]: !state[name] }))}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
          withContent={this.state.withContent}
        />
      </div>
    );
  }
}

class SidePageWithModalInside extends React.Component<
  {},
  {
    isModalOpened: boolean,
    ignoreBackgroundClick: boolean,
    blockBackground: boolean,
    withContent: boolean
  }
> {
  state = {
    isModalOpened: false,
    ignoreBackgroundClick: true,
    blockBackground: false,
    withContent: false
  };

  render() {
    return (
      <div>
        {this.state.isModalOpened && this.renderModal()}
        <Sample
          current={1}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
        >
          <Button onClick={() => this.setState({ isModalOpened: true })}>
            Открыть modal
          </Button>
          <SampleConfigurator
            onChange={name =>
              this.setState(state => ({ [name]: !state[name] }))
            }
            ignoreBackgroundClick={this.state.ignoreBackgroundClick}
            blockBackground={this.state.blockBackground}
            withContent={true}
          />
        </Sample>
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
}

class SidePageWithStickyReaction extends React.Component<{}> {
  render() {
    const title = 'This is title';
    const subtitle = 'This is subtitle';

    return (
      <SidePage>
        <SidePage.Header>
          {fixed =>
            fixed ? (
              title
            ) : (
              <div>
                {title}
                <br />
                {subtitle}
              </div>
            )
          }
        </SidePage.Header>
        <SidePage.Body>
          {textSample}
          {textSample}
          {textSample}
          {textSample}
          {textSample}
        </SidePage.Body>
        <SidePage.Footer>
          {fixed =>
            fixed ? (
              title
            ) : (
              <div>
                {title}
                <br />
                {subtitle}
              </div>
            )
          }
        </SidePage.Footer>
      </SidePage>
    );
  }
}

storiesOf('SidePage', module)
  .add('With scrollable parent content', () => (
    <SidePageWithScrollableContent />
  ))
  .add('With Input in header', () => <SidePageWithInputInHeader />)
  .add('SidePage over another SidePage', () => <SidePageOverAnotherSidePage />)
  .add('SidePage with configuration', () => <SidePageWithCloseConfiguration />)
  .add('SidePage with Modal', () => <SidePageWithModalInside />)
  .add('SidePage with sticky reaction', () => <SidePageWithStickyReaction />)
  .add('Disabled SidePage', () => (
    <SidePage disableClose>
      <SidePage.Header>Disabled</SidePage.Header>
      <SidePage.Body>Content of disabled body</SidePage.Body>
    </SidePage>
  ));
