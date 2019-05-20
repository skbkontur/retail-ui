import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Layout from './components/Layout';
import TestPage from './components/TestPage';
import InputTestPage from './components/TestPages/InputTestPage';
import ListsTestPage from './components/TestPages/ListsTestPage';
import ModalsTestPage from './components/TestPages/ModalsTestPage';
import ComboBoxTestPage from './components/TestPages/ComboBoxTestPage';
import SelectTestPage from './components/TestPages/SelectTestPage';
import DatePickerTestPage from './components/TestPages/DatePickerTestPage';
import ButtonTestPage from './components/TestPages/ButtonTestPage';
import CheckBoxTestPage from './components/TestPages/CheckBoxTestPage';
import LinkTestPage from './components/TestPages/LinkTestPage';
import RadioGroupTestPage from './components/TestPages/RadioGroupTestPage';
import RadioTestPage from './components/TestPages/RadioTestPage';
import TextAreaTestPage from './components/TestPages/TextAreaTestPage';
import TooltipTestPage from './components/TestPages/TooltipTestPage';
import ExposeTidToDomTestPage from './components/TestPages/ExposeTidToDomTestPage';

let KebabTestPage;
if (process.env.hasKebab) KebabTestPage = require('./components/TestPages/KebabTestPage').default;
else KebabTestPage = () => <div>Does not work</div>;

let PagingTestPage;
if (process.env.hasPaging) PagingTestPage = require('./components/TestPages/PagingTestPage').default;
else PagingTestPage = () => <div>Does not work</div>;

let SidePageTestPage;
if (process.env.hasSidePage) SidePageTestPage = require('./components/TestPages/SidePageTestPage').default;
else SidePageTestPage = () => <div>Does not work</div>;

import './styles/reset.less';
import './styles/typography.less';
import AutocompleteTestPage from './components/TestPages/AutocompleteTestPage';
import ToastTestPage from "./components/TestPages/ToastTestPage";
import ToggleTestPage from "./components/TestPages/ToggleTestPage";

export default function ReactTestApplication() {
  return (
    <Router history={browserHistory}>
      <Route path={process.env.baseUrl + '/'} component={Layout}>
        <Route path="TestPage" component={TestPage} />
        <Route path="Input" component={InputTestPage} />
        <Route path="Lists" component={ListsTestPage} />
        <Route path="Modals" component={ModalsTestPage} />
        <Route path="ComboBoxes" component={ComboBoxTestPage} />
        <Route path="Select" component={SelectTestPage} />
        <Route path="DatePicker" component={DatePickerTestPage} />
        <Route path="Button" component={ButtonTestPage} />
        <Route path="CheckBox" component={CheckBoxTestPage} />
        <Route path="Link" component={LinkTestPage} />
        <Route path="RadioGroup" component={RadioGroupTestPage} />
        <Route path="Radio" component={RadioTestPage} />
        <Route path="Textarea" component={TextAreaTestPage} />
        <Route path="Tooltip" component={TooltipTestPage} />
        <Route path="ExposeTidToDom" component={ExposeTidToDomTestPage} />
        <Route path="Kebab" component={KebabTestPage} />
        <Route path="Paging" component={PagingTestPage} />
        <Route path="SidePage" component={SidePageTestPage} />
        <Route path="Autocomplete" component={AutocompleteTestPage} />
        <Route path="Toast" component={ToastTestPage}/>
        <Route path="Toggle" component={ToggleTestPage} />
      </Route>
    </Router>
  );
}
