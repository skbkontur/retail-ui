import React, { useContext } from "react";

import { DateInput, DateInputProps } from "../DateInput";

import { DateRangePickerContext } from "./DateRangePickerContext";
import { DateRangePickerDataTids } from "./DateRangePicker";

export const DateRangePickerField: React.FC<DateInputProps & { type: "start" | "end" }> = (props) => {
    const state = useContext(DateRangePickerContext);

    return (
        <div style={{ display: 'inline-block' }}>
            <DateInput
                width="100%"
                value={props.type === 'start' ? state.periodStart : state.periodEnd}
                withIcon
                size={props.size || state.size}
                minDate={props.type === 'start' ? state.minDate : state.maxDate}
                disabled={props.disabled}
                // ref={state.start} или ref={state.end} в зависимости от focus
                onFocus={() => {
                    if (state.setCurrentFocus) {
                        state.setCurrentFocus(props.type);
                    }

                    if (state.setShowCalendar) {
                        state.setShowCalendar(true);
                    }

                    if (props.type === 'start' ? state.periodStart : state.periodEnd) {
                        const [, month, year] = (props.type === 'start' ? state.periodStart || "" : state.periodEnd || "")?.split('.').map(Number);
                        if (month && state.calendarRef) {
                            state.calendarRef?.current?.scrollToMonth(month - 1, year);
                        }
                    }
                }}
                onValueChange={(value) => {
                    if (props.type === 'start' && state.setPeriodStart) {
                        state.setPeriodStart(value);
                        return;
                    }

                    if (props.type === 'end' && state.setPeriodEnd) {
                        state.setPeriodEnd(value);
                        return;
                    }
                }}
                data-tid={props.type === 'start' ? DateRangePickerDataTids.from : DateRangePickerDataTids.to}
                {...props}
            />
        </div>
    );
};
