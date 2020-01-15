// @flow
import React from 'react';

import { Input } from 'retail-ui/components/Input';

import cn from './DemoPage.less';

type State = {
    value1: string,
};

export default class DemoPage extends React.Component {
    state: State = {
        value1: '',
    };

    render(): React.Node {
        const { value1 } = this.state;

        return (
            <div className={cn('root')}>
                <h2>React-UI selenium testing demo page</h2>
                <h3>Demo block #1</h3>
                <div className={cn('block')}>
                    <div>
                        Input #1:{' '}
                        <Input
                            data-tid="ValueInput"
                            value={value1}
                            onChange={(e, value) => this.setState({ value1: value })}
                        />
                    </div>
                    <div>
                        Value from input #1: <span data-tid="ValueLabel">{value1}</span>
                    </div>
                </div>
            </div>
        );
    }
}
