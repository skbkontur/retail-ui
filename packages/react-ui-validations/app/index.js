import React from 'react';
import {render} from 'react-dom';
import Input from 'retail-ui/components/Input';
import {ValidationContainer, ValidationWrapperV1} from '../index';

class App extends React.Component {
    render () {
        return (
            <ValidationContainer>
                <ValidationWrapperV1>
                    <Input/>
                </ValidationWrapperV1>
            </ValidationContainer>
        );
    }
}

render(<App/>, document.getElementById('app'));