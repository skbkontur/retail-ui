/* eslint-disable import/no-duplicates */
//@ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import Logotype from "@skbkontur/react-ui/components/Logotype";
import Chocho from "@skbkontur/react-ui/components/Loader/Loader";
import {TopBar} from "@skbkontur/react-ui/components/TopBar";
import { Button, Fias } from "@skbkontur/react-ui/components"

import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { CloudIcon } from '../internal/icons/CloudIcon';
import { ArrowChevronDownIcon } from '../internal/icons/16px';
