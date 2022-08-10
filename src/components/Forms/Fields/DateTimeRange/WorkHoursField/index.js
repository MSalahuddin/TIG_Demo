import React from 'react';

import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import BorderedText from 'components/BorderedText';
import { format } from 'helpers/date';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import Box from 'components/Box';

const commonTxtProps = {
    bw: 0,
    c: "#fff",
    mr: 1, 
    styles: { text: typography["body/x-small – regular"] }
}
// To do, configure this to work from enum DAYS const. 
export const workHoursDaysOptions = [
    { key: 1, title: "Sunday" },
    { key: 2, title: "Monday" },
    { key: 3, title: "Tuesday" },
    { key: 4, title: "Wednesday" },
    { key: 5, title: "Thursday" },
    { key: 6, title: "Friday" },
    { key: 7, title: "Saturday" },
]

const WorkHoursField = ({ value, onSelect, ...props }) => {
    return (
        <DateTimeRange
            value={value}
            onSelect={onSelect}
            isWeekdays
            copy={{ label: "Work Hours" }}
            displayAllDay={false}
            renderValue={(val) => (
                <Box flexDirection={"row"} >
                    <BorderedText
                        bgc={colors["primary/50"]}
                        text={`${val?.startDate?.title} - ${val?.endDate?.title}`}
                        {...commonTxtProps}
                    />
                    <BorderedText
                        bgc={colors["additional/out & expens"]}
                        text={`${format(val?.startTime, "KK:mm a")} - ${format(val?.endTime, "KK:mm a")}`}
                        {...commonTxtProps}
                    />
                </Box>
            )}
            {...props}
        />
    )
}

export default WorkHoursField;