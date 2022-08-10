import { formatFileToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';
import { compact } from 'lodash';
import * as yup from 'yup';

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
    email: yup
        .string()
        .email()
        .max(100)
        .required()
        .label('Email'),
    phoneNumberCell: yup
        .string()
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Not a valid phone number',
        )
        .required()
        .label('Phone number (cell)'),
    phoneNumberWork: yup
        .string()
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Not a valid phone number',
        )
        .required()
        .label('Phone number (work)'),
    dataOfBirth: yup
        .string()
        .max(5)
        .label('Date of birth'),
    currentAddress: yup
        .string()
        .max(30)
        .required()
        .label('Current address'),
    currentReferenceName: yup
        .string()
        .max(30)
        .required()
        .label('Reference name'),
    currentReferencePhone: yup
        .string()
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Not a valid phone number',
        )
        .required()
        .label('Reference phone'),
    previousAddress: yup
        .string()
        .max(100)
        .required()
        .label('Previous address'),
    previousReferenceName: yup
        .string()
        .max(100)
        .required()
        .label('Reference name'),
    previousReferencePhone: yup
        .string()
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Not a valid phone number',
        )
        .required()
        .label('Reference phone'),
    docType: yup
        .string()
        .max(1)
        .required(),
    docNumber: yup
        .string()
        .max(9)
        .required()
        .label('Enter number'),
    picture: yup.object(),
    occupation: yup
        .string()
        .max(100)
        .required()
        .label('Occupation'),
    emergencyContact: yup
        .string()
        .max(100)
        .required()
        .label('Emergency contact'),
    emergencyContactPhone: yup
        .string()
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Not a valid phone number',
        )
        .required()
        .label('Emergency contact phone'),
});

const getDocumentType = ({ ssn, passport, drivingLicense }) => {
    return ssn ? { docNumber: ssn, docType: { text: "SSN", value: 'ssn' } } :
        passport ? { docNumber: passport, docType: { text: "Passport number", value: 'passport' } } :
            drivingLicense ? { docNumber: drivingLicense, docType: { text: "Driver licence", value: 'drivingLicense' } } : null
};

export const formatedInitialValues = (tenant) => {
    const docType = getDocumentType({ ssn: tenant?.ssn, passport: tenant?.ssn, drivingLicense: tenant?.drivingLicense });
    return ({
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        picture: tenant.picture ? { uri: tenant.picture } : null,
        phoneNumberCell: tenant.phone,
        phoneNumberWork: tenant?.workPhone,
        emergencyContact: tenant?.emergencyContact,
        emergencyContactPhone: tenant?.emergencyContactPhone,
        dataOfBirth: new Date(tenant?.birthday),
        docType: docType?.docType,
        docNumber: docType?.docNumber
    })
};


export const formatTenantFormDataToMutation = (form) => ({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: `+${form.phoneNumberCell}`,
    workPhone: form.phoneNumberWork && `+${form.phoneNumberWork}`,
    emergencyContact: form.emergencyContact,
    emergencyContactPhone: form.emergencyContactPhone && `+${form.emergencyContactPhone}`,
    [form.docType?.value]: form.docNumber,
    birthday: format(form?.dataOfBirth, 'yyyy-MM-dd'),
    referees: compact([
        form?.currentAddress && form?.currentReferenceName && {
            address: form.currentAddress,
            phone: `+${form.currentReferencePhone}`,
            name: form.currentReferenceName
        },
        form?.previousAddress && form?.previousReferenceName && {
            address: form.previousAddress,
            phone: `+${form.previousReferencePhone}`,
            name: form.previousReferenceName
        },
    ]),
    picture: formatFileToFileInput(form?.picture)?.file
})