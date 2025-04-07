import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

let strictMode = false;
if (process.env.strictMode === "true") strictMode = true;

import './styles/reset.less';
import './styles/typography.less';
import AutocompleteTestPage from './components/TestPages/AutocompleteTestPage';
import ToastTestPage from './components/TestPages/ToastTestPage';
import ToggleTestPage from './components/TestPages/ToggleTestPage';
import SwitcherTestPage from './components/TestPages/SwitcherTestPage';

function StrictModeWrapper(props) {
  return strictMode
    ? <StrictMode>
      {props.children}
    </StrictMode>
    : props.children
}

// eslint-disable-next-line import/no-default-export
export default function ReactTestApplication() {
  return (
    <StrictModeWrapper>
      <Router basename={process.env.baseUrl}>
        <Layout>
          <Routes>
            <Route path="TestPage" element={<TestPage />} />
            <Route path="Input" element={<InputTestPage />} />
            <Route path="/Lists" element={<ListsTestPage />} />
            <Route path="/Modals" element={<ModalsTestPage />} />
            <Route path="/ComboBoxes" element={<ComboBoxTestPage />} />
            <Route path="/Select" element={<SelectTestPage />} />
            <Route path="/DatePicker" element={<DatePickerTestPage />} />
            <Route path="/Button" element={<ButtonTestPage />} />
            <Route path="/CheckBox" element={<CheckBoxTestPage />} />
            <Route path="/Link" element={<LinkTestPage />} />
            <Route path="/RadioGroup" element={<RadioGroupTestPage />} />
            <Route path="/Radio" element={<RadioTestPage />} />
            <Route path="/Textarea" element={<TextAreaTestPage />} />
            <Route path="/Tooltip" element={<TooltipTestPage />} />
            <Route path="/ExposeTidToDom" element={<ExposeTidToDomTestPage />} />
            <Route path="/Kebab" element={<KebabTestPage />} />
            <Route path="/Paging" element={<PagingTestPage />} />
            <Route path="/SidePage" element={<SidePageTestPage />} />
            <Route path="/Autocomplete" element={<AutocompleteTestPage />} />
            <Route path="/Toast" element={<ToastTestPage />} />
            <Route path="/Toggle" element={<ToggleTestPage />} />
            <Route path="/Switcher" element={<SwitcherTestPage />} />
          </Routes>
        </Layout>
      </Router>
    </StrictModeWrapper>
  );
}
