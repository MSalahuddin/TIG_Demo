import React from 'react';

import SelectButtonInput from 'components/SelectButtonInput';

import Button from 'components/Button';
import Box from 'components/Box';
import Icon from 'components/Icon';
import {
  EVENT_REPEATS,
  stringifyEnumValue,
  EVENT_ALERTS,
} from 'constants/enums';
import Persona from 'components/Persona';
import useTheme from 'hooks/useTheme';
import { format } from 'helpers/date';
import { Container } from '../TaskForm';
import Form from 'components/Form';
import BuildingField from '../../Fields/BuildingField';
import UnitField from '../../Fields/UnitField';
import { CREATE_TASK_FORM_COPY } from 'pages/tasks/consts/microcopy';
import { TouchableOpacity } from 'react-native';
import { t } from 'helpers/react';
import Input from 'components/Input';
import { button_styles } from 'styles/button';
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { usaDateFormat } from 'constants/dateFormat';

const copy = CREATE_TASK_FORM_COPY;
const EventForm = ({ onSubmit, error, errors, setValue, navigation, initialValues, watching, touched }) => {
  const theme = useTheme();
  return (
    <Form onSubmit={onSubmit}>
      <Container theme={theme} style={{ marginTop: 18 }}  >
        <Input
          label="Title"
          autoFocus
          defaultValue={initialValues?.title}
          status={errors.title && 'danger'}
          caption={errors.title?.message}
          theme={theme}
          onChangeText={val => setValue('title', val)}
          mb={"0"}
          isRequired
        />
      </Container>

      <Container borderBottomWidth={1} paddingBottom={10} marginBottom={10} padding={0}>
        <Input
          label="Location"
          defaultValue={initialValues?.location}
          status={errors.location && 'danger'}
          caption={errors.location?.message}
          onChangeText={val => setValue('location', val)}
          icon={() => (
            <TouchableOpacity style={{ alignSelf: "center" }}>
              {Icon("search")({
                width: 18,
                height: 18,
                right: 0,
                position: "absolute",
                tintColor: theme['grey-200'],

              })}
            </TouchableOpacity>
          )}
          mt={2}
          mb={0}
        />
      </Container >
      <Box
        mx={1}
        mb="2px"
        justifyContent="space-between">
        <DateTimeRange
          copy={{ label: watching?.date ? "Date" : "Set Date Time" }}
          px={3}
          borderTopWidth={1}
          borderBottomWidth={1}
          borderColor={colors["gray scale/10"]}
          onSelect={({ startDate, endDate, startTime, endTime, allDay }) => {
            setValue('date', startDate);
            setValue('allDay', allDay);
            t(!!!allDay, setValue('startTime', startTime));
            t(!!!allDay, setValue('endTime', endTime));
          }}
          value={((watching?.date || watching?.allDay ) &&{ startDate: watching?.date, endDate: null, allDay: watching?.allDay, startTime: watching?.startTime, endTime: watching?.endTime })}
          labelStyle={typography["body/medium – regular"]}
        />
      </Box>
  

      <Container borderBottomWidth={0}>
        <SelectButtonInput
          onAdd={() =>
            navigation.navigate('SelectRepeat', {
              onSelect: ({ repeat, endRepeat }) => {
                setValue('repeat', repeat);
                setValue('endRepeat', endRepeat);
              },
              repeat: watching.repeat,
              endRepeat: watching.endRepeat,
            })
          }
          label={"Repeat"}
          addLabel={"Add repeat"}
          value={watching.repeat && `${stringifyEnumValue(EVENT_REPEATS, watching?.repeat,)}
        ${`, Until ${format(watching.endRepeat, usaDateFormat, '')}`}`
          }
          mt={3}

        />
        <SelectButtonInput
          onAdd={() =>
            navigation.navigate('SelectAlert', {
              onSelect: val => setValue('alert', val),
              value: watching.alert,
            })
          }
          label={"Alert"}
          addLabel={"Add Alert"}
          value={watching.alert && stringifyEnumValue(EVENT_ALERTS, watching.alert)}
          mt={3}

        />
      </Container>
      <Container borderBottomWidth={0}>
        <Input
          label="Note"
          multiline={true}
          icon={Icon('expandInput', "pm")}
          textStyle={{ minHeight: 44 }}
          defaultValue={initialValues?.content}
          status={errors.content && 'danger'}
          caption={errors.content?.message}
          onChangeText={val => setValue('content', val)}
        />
      </Container>

      <Container theme={theme} minHeight={144} marginBottom={2} marginTop={7} pb={2} height={null} alignItems={"flex-start"}>
        <BuildingField
          status={errors.building && 'danger'}
          caption={errors.building?.message}
          value={watching?.building}
          setValue={val => setValue('building', val)}
          touched={touched.indexOf('building') !== -1}
          width={"100%"}
          navigation={navigation}
          {...copy.inputs.building}
        />
        <UnitField
          my='1'
          width={"100%"}
          status={errors.unit && 'danger'}
          caption={errors.unit?.message}
          setValue={val => setValue('unit', val)}
          value={watching.unit}
          touched={touched.indexOf('unit') !== -1}
          navigation={navigation}
          buildingId={watching.building?.pk}
        />
      </Container>

      <Container marginTop={10} borderBottomWidth={0}>

        <SelectButtonInput
          label="Assign To"
          addLabel="Choose a member"
          value={watching.assignees.length ? watching.assignees : null}
          renderValue={assignees => (
            <Box width={1}>
              {assignees.map((user, i) => (
                <Persona
                  key={user.id}
                  profile={user.picture}
                  name={user.fullName}
                  title={user.title}>
                  <Button
                    shape="circle"
                    appearance="ghost"
                    status="danger"
                    icon={Icon('minus-circle')}
                    onPress={() =>
                      setValue(
                        'assignees',
                        assignees.filter(s => s.id !== user.id),
                      )
                    }
                  />
                </Persona>
              ))}
            </Box>
          )}
          onAdd={() =>
            navigation.navigate('SelectAssignees', {
              assignees: watching?.assignees,
              onSelect: assignees => setValue('assignees', assignees),
            })
          }
        />
      </Container>
      <Box px="4" py="4">
        <Button
          onPress={onSubmit}
          {...button_styles.primary}
        >
          Save
        </Button>
      </Box>
    </Form>

  )
}

export default EventForm;