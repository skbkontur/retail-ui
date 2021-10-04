import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

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
import ToastTestPage from './components/TestPages/ToastTestPage';
import ToggleTestPage from './components/TestPages/ToggleTestPage';
import SwitcherTestPage from "./components/TestPages/SwitcherTestPage";

const customHistory = createBrowserHistory();
const basePath = process.env.baseUrl + '/';

// eslint-disable-next-line import/no-default-export
export default function ReactTestApplication() {
  return (
    <Router history={customHistory}>
      <Route
        path={basePath}
        render={({ match: { url } }) => (
          <Layout>
            <Switch>
              <Route path={`${url}/TestPage`} component={TestPage} />
              <Route path={`${url}/Input`} component={InputTestPage} />
              <Route path={`${url}/Lists`} component={ListsTestPage} />
              <Route path={`${url}/Modals`} component={ModalsTestPage} />
              <Route path={`${url}/ComboBoxes`} component={ComboBoxTestPage} />
              <Route path={`${url}/Select`} component={SelectTestPage} />
              <Route path={`${url}/DatePicker`} component={DatePickerTestPage} />
              <Route path={`${url}/Button`} component={ButtonTestPage} />
              <Route path={`${url}/CheckBox`} component={CheckBoxTestPage} />
              <Route path={`${url}/Link`} component={LinkTestPage} />
              <Route path={`${url}/RadioGroup`} component={RadioGroupTestPage} />
              <Route path={`${url}/Radio`} component={RadioTestPage} />
              <Route path={`${url}/Textarea`} component={TextAreaTestPage} />
              <Route path={`${url}/Tooltip`} component={TooltipTestPage} />
              <Route path={`${url}/ExposeTidToDom`} component={ExposeTidToDomTestPage} />
              <Route path={`${url}/Kebab`} component={KebabTestPage} />
              <Route path={`${url}/Paging`} component={PagingTestPage} />
              <Route path={`${url}/SidePage`} component={SidePageTestPage} />
              <Route path={`${url}/Autocomplete`} component={AutocompleteTestPage} />
              <Route path={`${url}/Toast`} component={ToastTestPage} />
              <Route path={`${url}/Toggle`} component={ToggleTestPage} />
              <Route path={`${url}/Switcher`} component={SwitcherTestPage} />
            </Switch>
          </Layout>
        )}
      ></Route>
    </Router>
  );
}
