/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import { Loader } from "@skbkontur/react-ui/components/Loader";
import { Spinner } from "@skbkontur/react-ui/components/Spinner";

class Foo extends React.Component {
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <Loader active type="normal" cloud>blagagagaga</Loader>
        <Spinner dimmed type="mini" cloud />
      </div>
    );
  }
}

class Bar extends React.Component {
  render() {
    return (
      <div>
        blah asdasda
        <div>adasda</div>
        <Loader active type="big" cloud />
        <Spinner type="normal" cloud />
      </div>
    );
  }
}

class Coo extends React.Component {
  render() {
    return (
      <Loader active type="mini" cloud>
        <div>
          blah asdasda
          <div>adasda</div>
          <Spinner type="big" cloud />
        </div>
      </Loader>
    );
  }
}
