#!/usr/bin/node

import { marked } from 'marked';
import customHeadingId from 'marked-custom-heading-id';

marked.use(customHeadingId());

import 'marked/bin/marked';
