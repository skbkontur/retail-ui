import { addDecorator, configure } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "../src/themes/default";
import { getFlatTheme } from "../src/themes/flat";
import "focus-visible";

const flatTheme = getFlatTheme();
addDecorator(story => <ThemeProvider theme={getDefaultTheme(flatTheme)}>{story()}</ThemeProvider>);

const req = require.context("../src", true, /.stories.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
