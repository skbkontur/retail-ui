/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import { Switcher } from "@skbkontur/react-ui/components/Switcher";
import { MaskedInput } from "@skbkontur/react-ui/components/MaskedInput";
import  SuperComponent from '@skbkontur/react-ui/components/TokenInput';
import  VerySuperComponent from '@skbkontur/react-ui/components/Popup/Popup';

class Foo extends React.Component {
  private handleChange(e) {
    console.log(e)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <Switcher items={[1,2]} onChange={(e) => this.handleChange(e)}></Switcher>
      </div>
      )
  }
}

class FooNormal extends React.Component {
  private handleChange(e) {
    console.log(e)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <Switcher items={[1,2]} onChange={this.handleChange}></Switcher>
      </div>
      )
  }
}

class Bar extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <Switcher items={[1,2]} onChange={(e, v) => this.handleChange(v)}></Switcher>
      </div>
    );
  }
}


class Coo extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <MaskedInput onUnexpectedInput={()=> this.handleChange('coo')}></MaskedInput>
      </div>
    );
  }
}

class CooNormal extends React.Component {
  private handleChange() {
    console.log()
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <MaskedInput onUnexpectedInput={this.handleChange}></MaskedInput>
      </div>
    );
  }
}

class Fee extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <SuperComponent onChange={(v)=> this.handleChange(v)}></SuperComponent>
      </div>
    );
  }
}

class FeeNormal extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        blah TopBarLocaleHelper
        <SuperComponent onChange={this.handleChange}></SuperComponent>
      </div>
    );
  }
}
