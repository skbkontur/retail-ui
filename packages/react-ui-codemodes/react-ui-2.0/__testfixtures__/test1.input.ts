/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import  Fias from "@skbkontur/react-ui";
import { Logotype } from "@skbkontur/react-ui/components/Logotype";
import  Chocho  from "@skbkontur/react-ui/components/Loader";

import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { CloudIcon } from '../internal/icons/CloudIcon';
import { ArrowChevronDownIcon } from '../internal/icons/16px';
