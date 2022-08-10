import React, { useMemo } from 'react'

import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import { format } from 'helpers/date';
import { styles } from './styles';
import StyledLine from 'components/StyledLine';

const timeFormat = 'KK:mm a';
const EventsListItem = ({ event,subject = "Task 6 category",themeColor,  onSeeMore }) => {
    const theme = useTheme();
    const [startString, endString] = useGetTimes(event);
    return (
        <Box alignSelf={"center"} marginTop={1} width={"90%"} alignItems={"center"}>
            <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                borderLeftWidth={4}
                my="2"
                px="3"
                mx="3"
                width={"100%"}
                maxWidth={"100%"}
                borderLeftColor={themeColor}>
                <Box maxWidth={"72%"}>
                    <Text fontSize={16} lineHeight={20} numberOfLines={2}>
                        {event.title}
                    </Text>
                    <Text category="p2" color={theme['grey-200']}>{subject}</Text>
                    <Text category="p2" color={theme['grey-200']}>
                        {event.location || (event.building
                            ? `${event.building.displayName}${event.unit ? `, Unit ${event.unit.unitNumber}` : ''
                            }`
                            : null)}
                    </Text>
                </Box>
                <Box alignItems="flex-end">
                    <Text
                        fontSize={17}
                        color={theme['grey-400']}>
                        {startString}
                    </Text>
                    {<Text category="c2" color={theme['grey-200']}>{endString}</Text>}
                    <Text onPress={onSeeMore} style={{ color: themeColor, ...styles.coloredText }} > See More</Text>
                </Box>
            </Box>
            <StyledLine right={0} width={"90%"} position={"relative"} opacity={0.5} marginTop={0} top={0} height={1} borderWidth={0} backgroundColor={theme['grey-100']} />
        </Box>
    )
}

export const calcDate = (date, time = '') => {
    const d = new Date(`${date}T${time}Z`);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d;
};


const useGetTimes = ({date, allDay, startTime, endTime, due}) => useMemo(() => {
    const startString = allDay ? "All Day" : format(date ? calcDate(date, startTime) : due, timeFormat, "", { toDate: true });
    const endString = (allDay || due) ? "" : format(calcDate(date, endTime), timeFormat);
    return [startString, endString]
}, [date, allDay, startTime, endTime, due])

export default EventsListItem;