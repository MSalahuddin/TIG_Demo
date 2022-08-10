import * as yup from 'yup';
import { formatFileToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import { workHoursDaysOptions } from 'components/Forms/Fields/DateTimeRange/WorkHoursField';

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(30)
    .required()
    .label('First Name'),
  lastName: yup
    .string()
    .max(30)
    .required()
    .label('Last Name'),
  title: yup
    .string()
    .label('Title'),
  identificationNumber: yup
    .string()
    .label('ID'),
  email: yup
    .string()
    .email()
    .max(100)
    .required()
    .label('Email'),
  phone: yup
    .string()
    .required()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .label('Cell Phone'),
  birthday: yup
    .date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 15)))
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
    .label('DOB'),
  picture: yup.object().shape({
    uri: yup
      .string()
      .label('picture')
  }).nullable(),
  address: yup
    .string()
    .label('Home Address'),
  officeEmail: yup
    .string()
    .email()
    .nullable()
    .label('Office Email'),
  officePhone: yup
    .string()
    .nullable()
    .label('Office Phone'),
  officeAddress: yup
    .string()
    .nullable()
    .label('Office Address'),
  workHours: yup
    .object().shape({
      end: yup
        .string(),
      start: yup
        .string(),
      startDay: yup
        .number(),
      endDay: yup
        .number()
    })
    .label('Work Hours'),
});

export const formatedInitialValues = (user) => user && ({
  address: user?.address,
  firstName: user.firstName,
  lastName: user.lastName,
  title: user?.title,
  email: user.email,
  identificationNumber: user.identificationNumber,
  picture: user.picture ? { uri: user.picture } : null,
  phone: user.phone,
  birthday: user?.birthday && new Date(user.birthday),
  workHours: user?.workHours && {
    endDate: workHoursDaysOptions.find(item => item?.key === user.workHours.endDay),
    startDate: workHoursDaysOptions.find(item => item?.key === user.workHours.startDay),
    endTime: new Date(`July 1, 1999 ${user?.workHours?.end}`),
    startTime: new Date(`July 1, 1999 ${user?.workHours?.start}`),
  },
  officeEmail: user?.workingDetails?.email,
  officePhone: user?.workingDetails?.phone,
  officeAddress: user?.workingDetails?.address
})


const getTimes = (date) => {
  if (!date) {
    return null
  }
  return `${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`
};

export const formatUserFormDataToMutation = (form) => ({
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  address: form?.address,
  phone: form.phone,
  birthday: format(form?.birthday, 'yyyy-MM-dd'),
  identificationNumber: form.identificationNumber,
  workingDetails: {
    email: form?.officeEmail,
    phone: form?.officePhone,
    address: form?.officeAddress
  },
  workHours: {
    endDay: form.workHours?.endDate?.key,
    startDay: form?.workHours?.startDate?.key,
    end: getTimes(form?.workHours?.endTime),
    start: getTimes(form?.workHours?.startTime)
  },
  picture: formatFileToFileInput(form?.picture)?.file
})