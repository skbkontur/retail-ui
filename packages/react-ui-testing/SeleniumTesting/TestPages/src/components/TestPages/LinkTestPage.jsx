import React from 'react';
import Link from 'retail-ui/components/Link'
import { CaseSuite, Case } from '../Case';

export default class LinkTestPage extends React.Component {
    state = {
        value: null,
    };

    render(): React.Element<*> {
        return (
            <CaseSuite title='Link'>
                <Case title='Simple Link'>
                    <Case.Body>
                        <Link
                            href='#'
                            data-tid='SimpleLink'
                        >
                            Simple link
                        </Link>
                    </Case.Body>
                </Case>
                <Case title='Disabled Link'>
                    <Case.Body>
                        <Link
                            href='#'
                            data-tid='DisabledLink'
                            disabled
                        >
                            Disabled link
                        </Link>
                    </Case.Body>
                </Case>
                <Case title='Iconic Link'>
                    <Case.Body>
                        <Link
                            href='#'
                            data-tid='IconicLink'
                            icon='Add'
                        >
                            Iconic link
                        </Link>
                    </Case.Body>
                </Case>
                <Case title='Iconic Link Complex'>
                    <Case.Body>
                        <Link
                            href='#'
                            data-tid='IconicLinkComplex'
                            icon='USB'
                        >
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
