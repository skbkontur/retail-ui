import React from 'react';
import { Link } from '@skbkontur/react-ui/components/Link';
import AddIcon from '@skbkontur/react-icons/Add';
import USBIcon from '@skbkontur/react-icons/USB';

import { CaseSuite, Case } from '../Case';

export default class LinkTestPage extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <CaseSuite title="Link">
        <Case title="Simple Link">
          <Case.Body>
            <Link href="#" data-tid="SimpleLink">
              Simple link
            </Link>
          </Case.Body>
        </Case>
        <Case title="Disabled Link">
          <Case.Body>
            <Link href="#" data-tid="DisabledLink" disabled>
              Disabled link
            </Link>
          </Case.Body>
        </Case>
        <Case title="Iconic Link">
          <Case.Body>
            <Link href="#" data-tid="IconicLink" icon={<AddIcon />}>
              Iconic link
            </Link>
          </Case.Body>
        </Case>
        <Case title="Iconic Link Complex">
          <Case.Body>
            <Link href="#" data-tid="IconicLinkComplex" icon={<USBIcon />}>
              <span>prefix</span>
              text
              <span>suffix</span>
            </Link>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
