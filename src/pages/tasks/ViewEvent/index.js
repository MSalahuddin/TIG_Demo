
import React, { useCallback, useMemo } from "react";
import { Container } from "components/Forms/Tasks/TaskForm";
import TaskScreenLayout from "components/TaskScreenLayout";
import { getActions } from "constants/actions";
import viewEventQuery from 'queries/tasks/viewEvent.gql';

import { useMutation, useQuery } from "urql";
import Text from "components/Text";
import Features from "components/Features";
import ViewTaskSection from "../ViewTask/ViewTaskSection";
import ViewTaskAssigneesSection from "../ViewTask/ViewTaskAssigneesSection";
import useTheme from "hooks/useTheme";
import Persona from "components/Persona";
import Box from "components/Box";
import { TEXT } from "../ViewTask/ViewTaskHeaderSection";
import Button from "components/Button";
import { styles } from "./styles";
import { format } from "helpers/date";
import { EVENT_ALERTS, EVENT_REPEATS, stringifyEnumValue } from "constants/enums";
import { useIsOpen } from "hooks/useIsOpen";
import deleteEventMutation from 'queries/tasks/deleteEvent.gql';
import DeleteModal from "components/DeleteModal";
import { usaDateFormat } from "constants/dateFormat";

const ViewEvent = ({ navigation, route }) => {
    const { isOpen, open, close } = useIsOpen()
    const eventId = route.params?.id;
    const theme = useTheme()
    const [__, deleteEvent] = useMutation(deleteEventMutation);

    const [res, executeQuery] = useQuery({
        query: viewEventQuery,
        variables: {
            id: eventId,
            pause: !eventId,
        },
        requestPolicy: 'network-only',
    });
    const event = res.data?.event;

    const handleDeleteSubtask = useCallback(async (id) => {

        const params = { input: { id } }
        return new Promise(async (resolve, rej) => {
            const res = await deleteEvent(params);
            const success = res?.data?.deleteEvent?.success

            if (res.error || !success) {
                rej(res.error || "failed to delete the subtask")
            };

            resolve(success)
            return success

        })
    })

    const features = useGetFeatures(event)

    const handleDelete = async () => {
        const success = await handleDeleteSubtask(eventId)
        close()
        if (success) return navigation.navigate("Calendar");
    }

    return (
        <TaskScreenLayout
            headerProps={{
                title: "Appointment",
                actions: getActions(["back", { onPress: () => navigation.goBack() }], ["edit", { onPress: () => navigation.navigate("EditEvent", { id: eventId, onEdit: executeQuery }) }])
            }}
        >
            <Box justifyContent={"space-between"} height={"100%"}>
                <Box px={"3%"} mt={18} pb={"18px"}>
                    <Container>
                        <TEXT pb={"10px"} ml="-2px" category="h1" mt="2" fontSize={20} fontWeight={"bold"} color={theme['color-primary-700']}>{event?.title}</TEXT>
                    </Container>
                    <Container {...styles?.sectionContainer} marginTop={36} flex={1} >
                        <Features
                            theme={theme}
                            features={features}
                            styles={styles.features(theme)}
                        />
                    </Container>
                    <ViewTaskSection display={event?.content} label={null} theme={theme} styles={styles.content} divider>
                        <Text category="p2" appearance="hint" color={theme['grey-300']}>{event?.content}</Text>
                    </ViewTaskSection>

                    <ViewTaskSection display={event?.building} theme={theme} label={"In reference to property"} styles={styles.buildingSection}  >
                        <Persona profile={event?.building?.image} name={event?.building?.displayName} title={event?.unit?.unitNumber} styles={styles.building} />
                    </ViewTaskSection>
                    <ViewTaskAssigneesSection assignees={event?.assignees?.edges} theme={theme} styles={styles.assignees} divider={false} />
                </Box>
                <Box pb={"36px"}>
                    <Button shape="circle" containerStyle={styles.buttonContainer} onPress={open} >Delete Appointment</Button>
                </Box>
            </Box>
            <DeleteModal title={"Are you sure you want to delete this appointment? "} onDelete={handleDelete} visible={isOpen} onHide={close} styles={{ view: { padding: 18 }, title: { marginTop: 20, borderWidth: 1, paddingBottom: 7 } }} />
        </TaskScreenLayout>
    )
};

const formatTime = (time) => time.split(":").slice(0, -1).join(":");

const useGetFeatures = (event) => useMemo(() => ([
    event?.location && { icon: "location", label: "Location", content: event?.location, pack: "pm" },
    event?.date && { icon: "calendar_b", label: "Date", content: format(event?.date, `EEEE, ${usaDateFormat}`, "", { toDate: true }), pack: "pm" },
    event?.startTime && { icon: "clock", label: "Time", content: `${formatTime(event?.startTime)} - ${formatTime(event?.endTime || "")}`, pack: "pm" },
    event?.repeat && { icon: "repeat", label: "Repeats", content: stringifyEnumValue(EVENT_REPEATS, event?.repeat), pack: "pm" },
    (event?.alert && { icon: "alert", label: "Alert", content: stringifyEnumValue(EVENT_ALERTS, Math.abs(event?.alert)), pack: "pm", })
]), [event])

export default ViewEvent