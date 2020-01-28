// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { LoaderOld } from '../LoaderOld';
import Tooltip from '../../Tooltip';
import Button from '../../Button';

function getItems(count: number) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(i);
  }
  return items;
}

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
};

class ContentComponent extends React.Component<{
  itemsCount: number;
  additionalStyle?: object;
}> {
  public render() {
    return (
      <div style={{ ...wrapperStyle, ...this.props.additionalStyle }}>
        <LoaderOld active type={'big'}>
          {getItems(this.props.itemsCount).map(i => (
            <div key={i}>{i}</div>
          ))}
        </LoaderOld>
      </div>
    );
  }
}

export class LoaderOldAndButton extends React.Component<{ active: boolean }> {
  public state = {
    isTooltipOpened: false,
  };

  public render() {
    return (
      <LoaderOld active={this.props.active} type={'big'}>
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
      </LoaderOld>
    );
  }
}

storiesOf('LoaderOld', module)
  .add('Simple', () => <LoaderOld active />)
  .add('Type "big"', () => <ContentComponent itemsCount={10} />)
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
      <LoaderOld active type={'big'}>
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
      </LoaderOld>
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
  .add('Vertical scroll', () => <ContentComponent itemsCount={200} />)
  .add('Horizontal scroll', () => <ContentComponent itemsCount={10} additionalStyle={{ width: '2500px' }} />)
  .add('Both dimensions scrollable content with spaces around', () => (
    <ContentComponent itemsCount={200} additionalStyle={{ width: '2500px', margin: '600px 200px' }} />
  ))
  .add('Active loader', () => <LoaderOldAndButton active />)
  .add('Inactive loader', () => <LoaderOldAndButton active={false} />);
