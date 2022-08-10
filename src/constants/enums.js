import { __EnumValue } from "graphql";

export const stringifyEnumKey = key => {
  return key
    ? key
      .split('_')
      .map(w => `${w[0].toUpperCase()}${w.substr(1).toLowerCase()}`)
      .join(' ')
      .split("/").map(str => `${str[0].toUpperCase()}${str.substr(1).toLowerCase()}`).join('/') //To-Do: Improve this?
    : '';
};

export const stringifyEnumValue = (enu, value) => {
  const key = Object.keys(enu).find(k => enu[k] === value);
  if (key) {
    return stringifyEnumKey(key);
  }
  return '';
};

export const formatEnumToSelectOptions = enumerator => Object.keys(enumerator).map(key => ({
  key: enumerator[key],
  title: key
    .split('_')
    .map(str => `${str[0].toUpperCase()}${str.substr(1).toLowerCase()}`)
    .join(' '),
}));

export const AMENITY_TYPES = {
  BUILDING: 1,
  UNIT: 2,
};

export const USER_TYPES = {
  TENANT: 1,
  LANDLORD: 2,
  MANAGEMENT: 3,
  STAFF: 0,
};

export const UNIT_STATUS = {
  LISTED: 1,
  VACANT: 2,
  OCCUPIED: 3,
};

export const RENT_TYPES = {
  FREE_MARKET: 1,
  RENT_STABILIZED: 2,
  RENT_CONTROLLED: 3,
};

export const UNIT_UTILITIES = {
  WATER: 1,
  GAS: 2,
  ELECTRICITY: 3,
};

export const DAYS = {
  SUNDAY: 1,
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
};

export const TASK_STATUSES = {
  TO_DO: 1,
  IN_PROGRESS: 2,
  DONE: 3,
  ARCHIVED: 4,
};

export const TASK_TYPES = {
  CUSTOM: 1,
  COLLECT_RENT: 2,
  LATE_RENT: 3,
  LEASE_RENEWAL: 4,
  DHCR_REGISTATION: 5,
  HPD_REGISTRATION: 6,
  BIRTHDAY: 7,
  HOLIDY: 8,
  MAINTENANCE_REQUEST: 9,
};

export const TASK_PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  ["N/A"]: 4
};

export const LEASE_STATUS = {
  CURRENT: 1,
  PAST: 2,
  PROSPECTIVE: 3,
  APPROVED: 4
};

export const LEASE_FORM_STATUS = {
  PROSPECTIVE: "prospective",
  APPROVED: "approved",
  SIGNED: "signed"
}

export const PROSPECTIVE_LEASE_STATUS = {
  INITIAL: 1,
  WITH_LEASE: 2,
  WITH_PACKAGE: 3,
};

export const TRANSACTION_SOURCES = {
  IN_APP: 1,
  MANUAL: 2,
};

export const DOCUMENT_TYPE = {
  FOLDER: 1,
  FILE: 2,
};

export const TRANSACTION_TYPE = {
  INCOME: 1,
  EXPENSE: 2,
};

const PAYMENT_CASH = "CASH"
const PAYMENT_CHECK = "CHECK"
const PAYMENT_CREDIT = "CREDIT"
const PAYMENT_IN_APP = "IN APP"
const PAYMENT_OTHER = "OTHER"
const PAYMENT_MANUAL = "MANUAL"

export const PAYMENT_METHODS = {
  CASH: PAYMENT_CASH,
  CHECK: PAYMENT_CHECK,
  CREDIT: PAYMENT_CREDIT,
  IN_APP: PAYMENT_IN_APP,
  MANUAL: PAYMENT_MANUAL,
  OTHER: PAYMENT_OTHER
};

export const EVENT_REPEATS = {
  NEVER: null,
  EVERY_DAY: 1,
  EVERY_WEEK: 2,
  EVERY_2_WEEKS: 3,
  EVERY_MONTH: 4,
  EVERY_YEAR: 5,
};

export const EVENT_ALERTS = {
  NONE: null,
  '1_DAY_BEFORE': 1,
  '2_DAYS_BEFORE': 2,
  '1_WEEK_BEFORE': 7,
  '2_WEEKS_BEFORE': 14,
  '1_MONTH_BEFORE': 30,
};

export const NOTIFICATION_TYPES = {
  BUILDING_ASSIGNMENT: 1,
  LEASE_APPROVAL: 2,
  LEASE_APPROVED: 3,
  LEASE_REJECTED: 4,
  TASK_ASSIGNMENT: 5,
  EVENT_ASSIGNMENT: 6,
  TASK_UPDATE: 7,
  PROVIDER_PUBLISHED: 8,
  EVENT: 9,
  EVENT_REMINDER: 10,
  TASK_REMINDER: 11,
  MAINTENANCE_REQUEST: 12,
  LEASE_SIGNED: 13,
  LEASE_RENEWAL: 14,
  COLLECT_RENT: 15,
  APPROVE_PAYMENT: 16,
};

export const MAINTENANCE_REQUEST_STATUSES = {
  OPEN: 1,
  CLOSED: 2,
};

export const MAINTENANCE_TIME_PREFERENCES = {
  MORNING: 1,
  AFTERNOON: 2,
  EVENING: 3,
};

export const MAINTENANCE_SERVICES = {
  ELECTRICIAN: 1,
  HANDYMAN: 2,
  PLUMBER: 3,
};

export const PAYMENT_STATUSES = {
  UNPAID: 1,
  PENDING: 2,
  APPROVED: 3,
};

export const PROPERTY_TYPES = {
  RESEDENTIAL: 1,
  COMMERCIAL: 2,
  INDUSTRIAL: 3,
  LAND: 4,
}

export const TENANCY_DURATION_OPTIONS = {
  "Less than 1 year": 1,
  "1-2 years": 2,
  "2-5 years": 3,
  "5-10 years": 4,
  "10+ years": 5,
};

export const TENANT_OPTION = {
  "Always": 1,
  "Most of the time": 2,
  "Sometimes": 3,
  "Rarely": 4,
  "Never": 5,
  "N/A": 6
}

export const FLAWED_BOOLEAN_OPTIONS = {
  YES: 1,
  NO: 2,
  NA: 3
}
export const COMPLIANCE_OPTIONS = {
  VIOLATION: 1,
  COMPLAINTS: 2,
  PERMITS: 3
}


export const VIOLATION_TYPES = {
  HOB: 1,
  DOB: 2,
  ECB: 3,
  NYPD: 4,
  DOH:5,
}