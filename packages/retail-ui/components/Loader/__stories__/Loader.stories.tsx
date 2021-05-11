// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Loader, { LoaderProps } from '../Loader';
import Tooltip from '../../Tooltip';
import Button from '../../Button';
import { css } from '../../../lib/theming/Emotion';

const loaderClass = css`
   {
    height: 100%;
  }
`;

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
};

class ContentComponent extends React.Component<{
  additionalStyle?: object;
  loaderProps?: LoaderProps;
}> {
  public render() {
    const { additionalStyle, loaderProps, children } = this.props;
    return (
      <div style={{ ...wrapperStyle, ...additionalStyle }}>
        <Loader active type={'big'} {...loaderProps}>
          {children}
        </Loader>
      </div>
    );
  }
}

class NumberList extends React.Component<{
  itemsCount: number;
}> {
  public render() {
    return (
      <>
        {this.getItems(this.props.itemsCount).map(i => (
          <div key={i}>{i}</div>
        ))}
      </>
    );
  }

  private getItems(count: number) {
    const items = [];
    for (let i = 0; i < count; i += 1) {
      items.push(i);
    }
    return items;
  }
}

class ActivateOnLargeContent extends React.Component {
  public state = {
    active: false,
  };

  public componentDidMount() {
    this.setState({ active: true });
  }
  public render() {
    const { active } = this.state;
    return (
      <ContentComponent additionalStyle={{ height: 600, overflow: 'auto' }} loaderProps={{ active }}>
        <NumberList itemsCount={100} />
      </ContentComponent>
    );
  }
}

export class LoaderAndButton extends React.Component<{ active: boolean }> {
  public state = {
    isTooltipOpened: false,
  };

  public render() {
    return (
      <Loader active={this.props.active} type={'big'}>
        <h1>
          Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
        </h1>
        <Tooltip render={() => 'Yes, you can!'} trigger={this.state.isTooltipOpened ? 'opened' : 'closed'}>
          <Button
            onClick={() => {
              this.setState({ isActive: true, isTooltipOpened: true });
            }}
          >
            Can you click me?
          </Button>
        </Tooltip>
        <p>
          No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
          Leela, Bender, we're going grave robbing.
        </p>
        <p>
          Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
          <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
          <em>It's okay, Bender.</em> I like cooking too.
        </p>
        <h2>Oh, I think we should just stay friends.</h2>
        <p>
          No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look
          for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his
          wife holding up? …To shreds, you say.
        </p>
        <ol>
          <li>No! The kind with looting and maybe starting a few fires!</li>
          <li>You are the last hope of the universe.</li>
          <li>Hey, guess what you're accessories to.</li>
        </ol>
      </Loader>
    );
  }
}

storiesOf('Loader', module)
  .add('Simple', () => <Loader active />)
  .add('Type "big"', () => (
    <ContentComponent>
      <NumberList itemsCount={10} />
    </ContentComponent>
  ))
  .add('Type "big" with text', () => (
    <div style={{ width: 400 }}>
      <h1>
        Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
      </h1>
      <p>
        No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
        Leela, Bender, we're going grave robbing.
      </p>
      <p>
        Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It's okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look for
        more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
        holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you're accessories to.</li>
      </ol>
      <Loader active type={'big'}>
        <h1>
          Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
        </h1>
        <p>
          No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
          Leela, Bender, we're going grave robbing.
        </p>
        <p>
          Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
          <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
          <em>It's okay, Bender.</em> I like cooking too.
        </p>
        <h2>Oh, I think we should just stay friends.</h2>
        <p>
          No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look
          for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his
          wife holding up? …To shreds, you say.
        </p>
        <ol>
          <li>No! The kind with looting and maybe starting a few fires!</li>
          <li>You are the last hope of the universe.</li>
          <li>Hey, guess what you're accessories to.</li>
        </ol>
      </Loader>
      <h1>
        Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
      </h1>
      <p>
        No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
        Leela, Bender, we're going grave robbing.
      </p>
      <p>
        Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It's okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look for
        more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
        holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you're accessories to.</li>
      </ol>
    </div>
  ))
  .add('Vertical scroll', () => (
    <ContentComponent>
      <NumberList itemsCount={200} />
    </ContentComponent>
  ))
  .add('Horizontal scroll', () => (
    <ContentComponent additionalStyle={{ width: '2500px' }}>
      <NumberList itemsCount={10} />
    </ContentComponent>
  ))
  .add('Both dimensions scrollable content with spaces around', () => (
    <ContentComponent additionalStyle={{ width: '2500px', margin: '600px 200px' }}>
      <NumberList itemsCount={200} />
    </ContentComponent>
  ))
  .add('Active loader', () => <LoaderAndButton active />)
  .add('Inactive loader', () => <LoaderAndButton active={false} />)
  .add('Wrapper with custom height and inactive loader', () => (
    <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: false }}>
      <div style={{ height: '100%', backgroundColor: '#DEDEDE' }}>
        <NumberList itemsCount={10} />
      </div>
    </ContentComponent>
  ))
  .add('Wrapper with custom height and active loader', () => (
    <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: true }}>
      <div style={{ height: '100%', backgroundColor: '#DEDEDE' }}>
        <NumberList itemsCount={10} />
      </div>
    </ContentComponent>
  ))
  .add('Activate Loader after mount on large content', () => <ActivateOnLargeContent />);
