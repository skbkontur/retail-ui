import React from 'react';

import { Tooltip } from '../../Tooltip';
import { Button } from '../../Button';
import { Loader } from '../Loader';
import { LoaderProps } from '..';

type LoaderAndButtonProps = Pick<LoaderProps, 'active'>;
interface LoaderAndButtonState {
  isTooltipOpened: boolean;
  isActive?: boolean;
}
export class LoaderAndButton extends React.Component<LoaderAndButtonProps, LoaderAndButtonState> {
  public state: LoaderAndButtonState = {
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
