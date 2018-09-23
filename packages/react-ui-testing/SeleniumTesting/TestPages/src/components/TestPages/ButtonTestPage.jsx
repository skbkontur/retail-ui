import React from 'react';
import Button from 'retail-ui/components/Button'
import { CaseSuite, Case } from '../Case';

export default class ButtonTestPage extends React.Component {
    state = {
        value: null,
    };

    render(): React.Element<*> {
        return (
            <CaseSuite title='Button'>
                <Case title='Simple Button'>
                    <Case.Body>
                        <Button
                            data-tid='SimpleButton'
                            value={this.state.value} 
                            onChange={(e, value) => this.setState({ value: value })}
                        />
                    </Case.Body>
                </Case>
           </CaseSuite>
        );
    }
}