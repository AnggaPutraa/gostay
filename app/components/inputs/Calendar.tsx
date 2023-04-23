'use client';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDate?: Date[];
}

const Calendar = ({
    value,
    onChange,
    disabledDate
}: CalendarProps) => {
    return (
        <DateRange
            ranges={[value]}
            rangeColors={['#3b44ff']}
            direction='vertical'
            date={new Date()}
            minDate={new Date()}
            disabledDates={disabledDate}
            showDateDisplay={false}
            onChange={onChange}
        />
    );
}

export default Calendar;