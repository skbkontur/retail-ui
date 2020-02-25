/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import { Switcher, TokenInput as SuperComponent, Button } from "@skbkontur/react-ui";
import { MaskedInput, Popup as VerySuperComponent } from "@skbkontur/react-ui/internal";

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
