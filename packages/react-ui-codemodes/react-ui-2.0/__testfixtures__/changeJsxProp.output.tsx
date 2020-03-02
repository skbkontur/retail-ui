/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import { Switcher } from "@skbkontur/react-ui/components/Switcher";
import { MaskedInput } from "@skbkontur/react-ui/components/MaskedInput";
import  TokenInput from '@skbkontur/react-ui/components/TokenInput';

class Foo extends React.Component {
  private handleChange(e) {
    console.log(e)
  }
  render() {
    return (
      <div>
        1
        <Switcher items={[1,2]} onValueChange={(e) => this.handleChange(e)}></Switcher>
      </div>
    );
  }
}

class FooNormal extends React.Component {
  private handleChange(e) {
    console.log(e)
  }
  render() {
    return (
      <div>
        2
        <Switcher items={[1,2]} onValueChange={this.handleChange}></Switcher>
      </div>
    );
  }
}

class Bar extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        3
        <Switcher items={[1,2]} onValueChange={v => {
          const c = some.e(v);
          this.handleChange(c)
        }}></Switcher>
      </div>
    );
  }
}

class BarBar extends React.Component {
  private handleChange(v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        3
        <Switcher items={[1,2]} onChange={(e,v) => {
          const c = e.target;
          this.handleChange(c)
        }}></Switcher>
      </div>
    );
  }
}

class BarNormal extends React.Component {
  private handleChange(e, v) {
    console.log(v)
  }
  render() {
    return (
      <div>
        4
        <Switcher items={[1,2]} onValueChange={this.handleChange}></Switcher>
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
        5
        <MaskedInput onUnexpectedInput={value => this.handleChange('coo')}></MaskedInput>
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
        6
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
        7
        <TokenInput onValueChange={(v)=> this.handleChange(v)}></TokenInput>
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
        8
        <TokenInput onValueChange={this.handleChange}></TokenInput>
      </div>
    );
  }
}
