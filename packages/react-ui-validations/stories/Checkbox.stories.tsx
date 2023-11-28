// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { Button } from '@skbkontur/react-ui/components/Button';
// import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
//
// import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
// import { Nullable } from '../typings/Types';
// import { ValidationsFeatureFlagsContext } from '../lib/featureFlagsContext';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { TokenInput } from '@skbkontur/react-ui';

import { ValidationWrapper } from '../src';

storiesOf('Checkbox', module).add('required', () => <CheckboxStory />);

// interface CheckboxStoryState {
//   checked: boolean;
// }
class CheckboxStory extends React.Component {
  // public state: CheckboxStoryState = {
  //   checked: false,
  // };

  // private container: ValidationContainer | null = null;
  //
  // public validateSex(): Nullable<ValidationInfo> {
  //   const { checked } = this.state;
  //   if (checked === false) {
  //     return { message: 'Поле обязательно', type: 'submit' };
  //   }
  //   return null;
  // }

  public render() {
    return (
      // <ValidationsFeatureFlagsContext.Provider value={{ ValidationsWrapperAndContainerRemoveExtraSpan: true }}>
      //   <div style={{ padding: '20px 20px' }}>
      //     <ValidationContainer ref={this.refContainer}>
      //       <ValidationWrapper validationInfo={this.validateSex()}>
      //         <Checkbox
      //           checked={this.state.checked ? this.state.checked : false}
      //           onValueChange={(v) => this.setState({ checked: v })}
      //         >
      //           Checkbox
      //         </Checkbox>
      //       </ValidationWrapper>
      //       <div style={{ padding: '20px 0' }}>
      //         <Button onClick={() => this.container && this.container.validate()}>Check</Button>
      //       </div>
      //     </ValidationContainer>
      //   </div>
      // </ValidationsFeatureFlagsContext.Provider>
      <ValidationWrapper validationInfo={null}>
        <div style={{ padding: 40, background: 'red' }}>
          <TokenInput getItems={() => Promise.resolve([])} />
        </div>
      </ValidationWrapper>
    );
  }

  // private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
