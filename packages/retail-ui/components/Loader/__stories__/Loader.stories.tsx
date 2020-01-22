import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from '../Loader';
import { Tooltip } from '../../Tooltip';
import { Button } from '../../Button';

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

class CustomLoader extends React.Component {
  public render() {
    return (
      <div>
        <Loader active component={<span>LOADING...</span>}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam rerum nisi error nesciunt at sunt, cum
          reprehenderit sapiente quia recusandae! Distinctio incidunt ratione a alias officiis voluptatum quae et optio.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam placeat adipisci qui tempore ratione sed,
          impedit saepe? Non, iste soluta? Quos voluptatem temporibus rerum explicabo molestias pariatur repudiandae,
          dicta officia.
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet reprehenderit quia, facere error aspernatur
          ipsa unde amet nemo impedit totam saepe consequatur? Illo ea qui omnis incidunt laboriosam sit fugiat.
        </Loader>
      </div>
    );
  }
}
class ContentComponent extends React.Component<{
  itemsCount: number;
  additionalStyle?: object;
}> {
  public render() {
    return (
      <div style={{ ...wrapperStyle, ...this.props.additionalStyle }}>
        <Loader active type={'big'}>
          {getItems(this.props.itemsCount).map(i => (
            <div key={i}>{i}</div>
          ))}
        </Loader>
      </div>
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
          Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
          good vestments.&quot;
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
          No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also
          Santa Claus! Leela, Bender, we&apos;re going grave robbing.
        </p>
        <p>
          Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
          <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
          <em>It&apos;s okay, Bender.</em> I like cooking too.
        </p>
        <h2>Oh, I think we should just stay friends.</h2>
        <p>
          No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go…
          look for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is
          his wife holding up? …To shreds, you say.
        </p>
        <ol>
          <li>No! The kind with looting and maybe starting a few fires!</li>
          <li>You are the last hope of the universe.</li>
          <li>Hey, guess what you&apos;re accessories to.</li>
        </ol>
      </Loader>
    );
  }
}

storiesOf('Loader', module)
  .add('Simple', () => <Loader active />)
  .add('Type "big"', () => <ContentComponent itemsCount={10} />)
  .add('Type "big" with text', () => (
    <div style={{ width: 400 }}>
      <h1>
        Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
        good vestments.&quot;
      </h1>
      <p>
        No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also Santa
        Claus! Leela, Bender, we&apos;re going grave robbing.
      </p>
      <p>
        Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It&apos;s okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go…
        look for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is
        his wife holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you&apos;re accessories to.</li>
      </ol>
      <Loader active type={'big'}>
        <h1>
          Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
          good vestments.&quot;
        </h1>
        <p>
          No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also
          Santa Claus! Leela, Bender, we&apos;re going grave robbing.
        </p>
        <p>
          Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
          <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
          <em>It&apos;s okay, Bender.</em> I like cooking too.
        </p>
        <h2>Oh, I think we should just stay friends.</h2>
        <p>
          No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go…
          look for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is
          his wife holding up? …To shreds, you say.
        </p>
        <ol>
          <li>No! The kind with looting and maybe starting a few fires!</li>
          <li>You are the last hope of the universe.</li>
          <li>Hey, guess what you&apos;re accessories to.</li>
        </ol>
      </Loader>
      <h1>
        Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
        good vestments.&quot;
      </h1>
      <p>
        No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also Santa
        Claus! Leela, Bender, we&apos;re going grave robbing.
      </p>
      <p>
        Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It&apos;s okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go…
        look for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is
        his wife holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you&apos;re accessories to.</li>
      </ol>
    </div>
  ))
  .add('Vertical scroll', () => <ContentComponent itemsCount={200} />)
  .add('Horizontal scroll', () => <ContentComponent itemsCount={10} additionalStyle={{ width: '2500px' }} />)
  .add('Both dimensions scrollable content with spaces around', () => (
    <ContentComponent itemsCount={200} additionalStyle={{ width: '2500px', margin: '600px 200px' }} />
  ))
  .add('Active loader', () => <LoaderAndButton active />)
  .add('Inactive loader', () => <LoaderAndButton active={false} />)
  .add('Custom spinner', () => <CustomLoader />);
