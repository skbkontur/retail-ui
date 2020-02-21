/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { Fias, Logotype, Loader as Chocho, TopBar } from "@skbkontur/react-ui-addons";

import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { CloudIcon } from '../internal/icons/CloudIcon';
import { ArrowChevronDownIcon } from '../internal/icons/16px';
