import React from 'react';
import { Autocomplete } from '@skbkontur/react-ui/components/Autocomplete';

import { Case, CaseSuite } from '../Case';

const suggestions = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

class ListBasedAutocomplete extends React.Component {
  state = {
    value: '',
  };

  render(): React.Element<*> {
    return (
      <Autocomplete
        source={suggestions}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        data-tid="ListBasedAutocomplete"
      />
    );
  }
}

class FetchBasedAutocomplete extends React.Component {
  state = {
    value: '',
  };

  render(): React.Element<*> {
    return (
      <Autocomplete
        source={pattern => Promise.resolve(suggestions.filter(s => s.startsWith(pattern)))}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        data-tid="FetchBasedAutocomplete"
      />
    );
  }
}

class DelayedFetchBasedAutocomplete extends React.Component<{ sleepTimeInMs: number }> {
  state = {
    value: '',
  };

  render(): React.Element<*> {
    const { sleepTimeInMs } = this.props;
    return (
      <Autocomplete
        source={pattern =>
          new Promise(resolve => setTimeout(resolve, sleepTimeInMs)).then(() =>
            suggestions.filter(s => s.startsWith(pattern)),
          )
        }
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        data-tid="DelayedFetchBasedAutocomplete"
      />
    );
  }
}

export default class AutocompleteTestPage extends React.Component {
  render(): React.Element<*> {
    return (
      <CaseSuite title="Autocomplete">
        <Case title="List Based Autocomplete">
          <Case.Body>
            <ListBasedAutocomplete />
          </Case.Body>
        </Case>
        <Case title="Fetch Based Autocomplete">
          <Case.Body>
            <FetchBasedAutocomplete />
          </Case.Body>
        </Case>
        <Case title="1s delay Fetch Based Autocomplete">
          <Case.Body>
            <DelayedFetchBasedAutocomplete sleepTimeInMs={1000} />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
