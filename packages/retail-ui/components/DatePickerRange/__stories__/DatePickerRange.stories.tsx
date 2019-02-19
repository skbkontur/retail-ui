import {storiesOf} from "@storybook/react";
import {DatePickerRangeSimpleStory} from "./DatePickerRangeSimpleStory";
import {DatePickerRangeWithErrorsStory} from "./DatePickerRangeWithErrorsStory";

storiesOf('DatePickerRange', module).add('Simple using', DatePickerRangeSimpleStory);

storiesOf('DatePickerRange', module).add('With errors', DatePickerRangeWithErrorsStory);
