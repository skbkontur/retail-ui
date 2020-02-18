/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import { Loader } from "@skbkontur/react-ui/components/Loader";

class Foo extends React.Component {
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <Loader active type="normal" >blagagagaga</Loader>
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
        <Loader  active type="big"/>
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
        </div>
      </Loader>
      )
  }
}
