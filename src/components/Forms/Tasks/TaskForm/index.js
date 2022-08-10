import React from 'react';
import format from 'date-fns/format';

import Form from 'components/Form';
import SelectButtonInput from 'components/SelectButtonInput';
import Button from 'components/Button';
import Icon from 'components/Icon';
import GalleryInput from 'components/Forms/Fields/GalleryInput';
import Persona from 'components/Persona';
import Text from 'components/Text';
import Box from 'components/Box';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';

import {
  TASK_PRIORITY,
  stringifyEnumValue,
  EVENT_REPEATS,
  TASK_STATUSES,
} from 'constants/enums';
import useTheme from 'hooks/useTheme';
import { styles } from 'components/Forms/Tasks/TaskForm/styles';
import { CREATE_TASK_FORM_COPY } from 'pages/tasks/consts/microcopy';
import BuildingField from '../../Fields/BuildingField';
import UnitField from '../../Fields/UnitField';
import { t } from 'helpers/react';
import { removeValueFromObject } from 'helpers/object';
import styled from 'styled-components';
import SubtasksField from '../../Fields/SubtasksField';
import DateField from '../../Fields/DateField';
import SwitchField from 'components/Forms/Fields/SwitchField';
import FormError from 'components/Forms/FormError';
import ManagementTeamField from 'components/Forms/Fields/ManagementTeamField';
import { IS_SMALLER } from 'styles/responsive';
import { button_styles } from 'styles/button';
import Input from 'components/Input';
import { input_label_16 } from 'styles/reusable-classes';
import { usaDateFormat } from 'constants/dateFormat';

const copy = CREATE_TASK_FORM_COPY;
export const Container = styled(Box).attrs(({ theme, marginTop, ...style }) => ({
  marginLeft: 3,
  marginRight: 3,
  alignItems: "center",
  mt: 2,
  borderColor: theme['grey-100'],
  paddingVertical: 0,
  minHeight: 0,
  marginTop,
  paddingTop: 0,
  overflow: "hidden",
  paddingLeft: 0,
  alignItems: "flex-start",
  ...style
}))``

const TaskForm = ({ onSubmit, task, error, errors, setValue, navigation, initialValues, watching, touched }) => {

  const theme = useTheme();

  const onAddFiles = (files) => {
    const newFiles = files.filter(file => watching.files.every(f => f?.uri !== file?.uri));
    setValue('files', [...watching.files, ...newFiles]);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Container theme={theme} flex={1} style={{ marginTop: 18 }}  >
        <Input
          label="Title"
          isRequired
          autoFocus
          defaultValue={initialValues?.title}
          status={errors.title && 'danger'}
          caption={errors.title?.message}
          disabled={task?.systemTask}
          onChangeText={val => setValue('title', val)}
          mb={"0"}
        />
        <Input
          label="Description"
          multiline={true}
          icon={Icon('expandInput', "pm")}
          textStyle={{ minHeight: 44 }}
          defaultValue={initialValues?.content}
          status={errors.content && 'danger'}
          caption={errors.content?.message}
          onChangeText={val => setValue('content', val)}
          mb={"1"}
        />
      </Container>

      {t(task?.systemTask,
        (
          <Box mb="3" mx="3">
            <Text category="c1" appearance="hint">
              This is an automated task, some of it's properties cannot be
              changed.
            </Text>
          </Box>
        ))}
      <FormError mx={3} error={error} />
      <Container theme={theme} marginBottom={2} pb={2} height={null} alignItems={"flex-start"}>
        {/* <InputLabel label={copy.properyLabel} labelStyle={input_label_16}  /> */}
        <BuildingField
          status={errors.building && 'danger'}
          caption={errors.building?.message}
          value={watching?.building}
          setValue={val => setValue('building', val)}
          touched={touched.indexOf('building') !== -1}
          width={"100%"}
          disabled={task?.systemTask}
          navigation={navigation}
          {...copy.inputs.building}
          isRequired={true}
        />
        <UnitField
          paddingBottom={0}
          marginBottom={0}
          width={"100%"}
          status={errors.unit && 'danger'}
          caption={errors.unit?.message}
          setValue={val => setValue('unit', val)}
          value={watching.unit}
          touched={touched.indexOf('unit') !== -1}
          disabled={task?.systemTask}
          navigation={navigation}
          buildingId={watching.building?.pk}
        />
      </Container>
      {/* <Box px={!IS_SMALLER && 3} justifyContent={"space-between"} minHeight={162}> */}
      <MultiSelectBoxes
        label={"Status"}
        values={removeValueFromObject({ ...TASK_STATUSES }, 'ARCHIVED')}
        value={watching.status}
        onPress={(val) => setValue('status', val)}
        styles={styles.multiselect}
        isRequired={true}
      />
      <MultiSelectBoxes
        label={"Priority Level"}
        values={TASK_PRIORITY}
        value={watching.priority}
        onPress={(val) => setValue('priority', val)}
        activeColor={"#000"}
        styles={styles.multiselect}
        isRequired={true}

      />
      {/* </Box> */}
      <Container height={null} marginTop={7} theme={theme}>
        <DateField value={watching.due} onSelect={val => setValue('due', val)} editable={!task?.systemTask} isRequired />
        <SelectButtonInput
          label="Reminder"
          addLabel="Add Reminder"
          isRequired={true}
          value={
            watching.reminder
            && `${stringifyEnumValue(
              EVENT_REPEATS,
              watching.reminder || null,
            )}${watching.endReminder
              ? `, Until ${format(
                watching.endReminder,
                usaDateFormat,
              )}`
              :
              ''
            }`
          }
          onAdd={() =>
            navigation.navigate('SelectRepeat', {
              onSelect: ({ repeat, endRepeat }) => {
                setValue('reminder', repeat);
                setValue('endReminder', endRepeat);
              },
              repeat: watching.reminder,
              endRepeat: watching.endReminder,
            })
          }
          mt={3}
          mb={3}
        />
      </Container>
      <SubtasksField values={watching.subTasks} setValue={setValue} autofocus={!task?.id} />
      <Container height={null}>
        <GalleryInput
          label="Files"
          width={"100%"}
          mt={10}
          labelTransform={null}
          value={watching.files}
          onAdd={onAddFiles}
          navigation={navigation}
          onRemove={idx =>
            setValue(
              'files',
              watching.files.filter((f, idx2) => idx2 !== idx),
            )
          }
        />
      </Container>
      <Container marginTop={10} paddingBottom={3}>
        <ManagementTeamField
          Component={SelectButtonInput}
          triggerKey={"onAdd"}
          label="Assign To"
          addLabel="Choose a member"
          value={watching?.assignees?.length && watching?.assignees}
          setValue={assignees => setValue('assignees', assignees)}
          renderValue={(assignees) =>
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
          }
          copy={{ label: "Assign To", addLabel: "Choose a member" }}
        />
      </Container>
      <SwitchField
        label={copy.inputs.notify.label}
        checked={watching.sendNotificationOnCompletion}
        styles={{ switchContainer: { paddingRight: 36 } }}
        onChange={(val) => setValue('sendNotificationOnCompletion', val)}
        labelStyle={{ ...input_label_16, fontSize: IS_SMALLER ? 14 : 16 }}
      />
      <Box paddingBottom={18} marginTop={3}>
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

export default TaskForm