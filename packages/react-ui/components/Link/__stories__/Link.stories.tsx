import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Link } from '../Link';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';

const linkTests: CreeveyStoryParams['tests'] = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async hover() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  },
};

export default { title: 'Link', parameters: { creevey: { skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }] } } };

export const Simple: CSFStory<JSX.Element> = () => <Link>Simple Link</Link>;
Simple.parameters = { creevey: { tests: linkTests } };

export const WithIcon: CSFStory<JSX.Element> = () => <Link icon={<OkIcon />}>Simple Link</Link>;
WithIcon.parameters = { creevey: { tests: linkTests } };

export const Danger: CSFStory<JSX.Element> = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);
Danger.parameters = { creevey: { tests: linkTests } };

export const Grayed: CSFStory<JSX.Element> = () => <Link use="grayed">Simple link</Link>;
Grayed.parameters = { creevey: { tests: linkTests } };

export const Disabled: CSFStory<JSX.Element> = () => <Link disabled>Simple link</Link>;
Disabled.parameters = { creevey: { tests: linkTests } };

export const WithOnClick = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
WithOnClick.storyName = 'With onClick';
WithOnClick.parameters = { creevey: { skip: [true] } };

export const Loading: CSFStory<JSX.Element> = () => (
  <Gapped vertical>
    <Link loading>Simple loading </Link>
    <div style={{ width: '300px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <div style={{ width: '150px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <Link loading icon={<OkIcon />}>
      Loading link with icon
    </Link>
  </Gapped>
);
Loading.parameters = { creevey: { tests: linkTests } };
