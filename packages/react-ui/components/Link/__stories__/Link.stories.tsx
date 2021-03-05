import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Link } from '../Link';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';

const linkTests: CreeveyStoryParams['tests'] = {
  async ['idle, hover, pressed and released']() {
    const element = await this.browser.findElement({ css: '#test-element' });
    const link = await this.browser.findElement({ css: '[data-comp-name~=Link]' });

    const idle = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .move({ origin: link })
      .perform();

    const hover = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .press()
      .perform();

    const pressed = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .release()
      .perform();

    const released = await element.takeScreenshot();

    await this.expect({ idle, hover, pressed, released }).to.matchImages();
  },
};

export default { title: 'Link', parameters: { creevey: { skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }] } } };

export const Simple: CSFStory<JSX.Element> = () => <Link>Simple Link</Link>;
Simple.story = { parameters: { creevey: { tests: linkTests } } };

export const WithIcon: CSFStory<JSX.Element> = () => <Link icon={<OkIcon />}>Simple Link</Link>;
WithIcon.story = { parameters: { creevey: { tests: linkTests } } };

export const Danger: CSFStory<JSX.Element> = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);
Danger.story = { parameters: { creevey: { tests: linkTests } } };

export const Grayed: CSFStory<JSX.Element> = () => <Link use="grayed">Simple link</Link>;
Grayed.story = { parameters: { creevey: { tests: linkTests } } };

export const Disabled: CSFStory<JSX.Element> = () => <Link disabled>Simple link</Link>;
Disabled.story = { parameters: { creevey: { tests: linkTests } } };

export const WithSpaces: CSFStory<JSX.Element> = () => <Link>Link with spaces</Link>;
WithSpaces.story = { parameters: { creevey: { tests: linkTests } } };

export const Success: CSFStory<JSX.Element> = () => <Link use="success">Link with spaces</Link>;

Success.story = { parameters: { creevey: { tests: linkTests } } };

// export const WithOnClick: CSFStory<JSX.Element> = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
// WithOnClick.story = {
//   name: 'With onClick',
//   parameters: {
//     creevey: {
//       tests: {
//         async hover() {
//           const element = await this.browser.findElement({ css: '#test-element' });
//           const link = await this.browser.findElement({ css: '[data-comp-name*=Link]' });
//           const idle = await element.takeScreenshot();

//           await this.browser
//             .actions({ bridge: true })
//             .move({ origin: link })
//             .perform();

//           const hover = await element.takeScreenshot();

//           await this.browser
//             .actions({ bridge: true })
//             .click(link)
//             .perform();

//           const toast_element = await this.browser.findElement({ css: '[data-tid=StaticToast]' });

//           const toast = await toast_element.takeScreenshot();

//           await this.expect({ idle, hover, toast }).to.matchImages();
//         },
//       },
//     },
//   },
// };
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
Loading.story = { parameters: { creevey: { tests: linkTests } } };
