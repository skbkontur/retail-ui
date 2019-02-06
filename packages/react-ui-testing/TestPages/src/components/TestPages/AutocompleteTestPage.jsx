import React from 'react';
import Autocomplete from 'retail-ui/components/Autocomplete'
import { CaseSuite, Case } from '../Case';

export default class AutocompleteTestPage extends React.Component {
    state = {
        listBasedValue: "",
        fetchBasedValue: "",
        disabledPortalValue: "",
        suggestions: ["Grey Face", "Grey Space", "Kappa", "Keepo", "Resident Sleeper"],
    };

    renderListBasedAutocomplete()  : React.Element<*> {
      return (
        <Autocomplete
          source={this.state.suggestions}
          value={this.state.listBasedValue}
          onChange={(_, value) => this.setState({listBasedValue: value})}
          data-tid='ListBasedAutocomplete'
        />
      );
    }

    renderFetchBasedAutocomplete() : React.Element<*> {
      return (
        <Autocomplete
          source={(pattern) => Promise.resolve(this.state.suggestions.filter(s => s.startsWith(pattern)))}
          value={this.state.fetchBasedValue}
          onChange={(_, value) => this.setState({fetchBasedValue: value})}
          data-tid='FetchBasedAutocomplete'
        />
      );
    }

    render(): React.Element<*> {
      return (
            <CaseSuite title='Autocomplete'>
                <Case title='List Based Autocomplete'>
                    <Case.Body>
                      {this.renderListBasedAutocomplete()}
                    </Case.Body>
                </Case>
                <Case title='Fetch Based Autocomplete'>
                    <Case.Body>
                      {this.renderFetchBasedAutocomplete()}
                    </Case.Body>
                </Case>
           </CaseSuite>
        );
    }
}
