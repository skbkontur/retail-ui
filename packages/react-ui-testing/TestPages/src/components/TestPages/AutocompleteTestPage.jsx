import React from 'react';
import Autocomplete from 'retail-ui/components/Autocomplete'
import { CaseSuite, Case } from '../Case';

const suggestions = ["Grey Face", "Grey Space", "Kappa", "Keepo", "Resident Sleeper"];

class ListBasedAutocopmlete extends React.Component {
  state = {
    value: ""
  };

  render(): React.Element<*> {
    return (
      <Autocomplete
        source={suggestions}
        value={this.state.value}
        onChange={(_, value) => this.setState({value: value})}
        data-tid='ListBasedAutocomplete'
      />
    );
  }
}

class FetchBasedAutocopmlete extends React.Component {
  state = {
    value: ""
  };

  render(): React.Element<*> {
    return (
      <Autocomplete
        source={(pattern) => Promise.resolve(suggestions.filter(s => s.startsWith(pattern)))}
        value={this.state.value}
        onChange={(_, value) => this.setState({value: value})}
        data-tid='FetchBasedAutocomplete'
      />
    );
  }
}

export default class AutocompleteTestPage extends React.Component {
    render(): React.Element<*> {
      return (
            <CaseSuite title='Autocomplete'>
                <Case title='List Based Autocomplete'>
                    <Case.Body>
                      <ListBasedAutocopmlete/>
                    </Case.Body>
                </Case>
                <Case title='Fetch Based Autocomplete'>
                    <Case.Body>
                      <FetchBasedAutocopmlete/>
                    </Case.Body>
                </Case>
           </CaseSuite>
        );
    }
}
