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
        <Loader active type="normal" >blagagagaga</Loader>
        <Spinner dimmed type="mini" />
      </div>
      )
  }
}

class Bar extends React.Component {
  render() {
    return (
      <div>
        blah asdasda
        <div>adasda</div>
        <Loader active type="big"/>
        <Spinner type="normal" />
      </div>
      )
  }
}

class Coo extends React.Component {
  render() {
    return (
      <Loader active type="mini">
        <div>
          blah asdasda
          <div>adasda</div>
          <Spinner type="big" />
        </div>
      </Loader>
      )
  }
}
