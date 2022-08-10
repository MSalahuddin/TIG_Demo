import {
    TASK_STATUSES,
  } from 'constants/enums';

export const TASK_STATUS_COLORS = {
    [TASK_STATUSES.ARCHIVED]: 'grey',
    [TASK_STATUSES.DONE]: 'danger',
    [TASK_STATUSES.IN_PROGRESS]: 'info',
    [TASK_STATUSES.TO_DO]: 'primary',
  };

export const TASK_LIST_CATEGORIES = [
  {
    name: "All Tasks"
  },
  { name: "My Tasks", filterField: "user" },

  { name: "Assigned", categoryName: "Assigned Tasks", filterField: "assignee" },

  { name: "Unassigned", categoryName: "Unassigned Tasks" }
];
  
export const taskStatusColorMap = {
  [TASK_STATUSES.TO_DO]: 'color-primary2-500',
  [TASK_STATUSES.IN_PROGRESS]: 'color-primary3-500',
  [TASK_STATUSES.DONE]: 'color-primary-500',
  [TASK_STATUSES.ARCHIVED]: 'grey-400',
};

export const checkStatusAction = {
  [TASK_STATUSES.TO_DO]: TASK_STATUSES.IN_PROGRESS,
  [TASK_STATUSES.IN_PROGRESS]: TASK_STATUSES.DONE,
  [TASK_STATUSES.DONE]: TASK_STATUSES.DONE,
};

export const uncheckStatusAction = {
  [TASK_STATUSES.TO_DO]: TASK_STATUSES.TO_DO,
  [TASK_STATUSES.IN_PROGRESS]: TASK_STATUSES.IN_PROGRESS,
  [TASK_STATUSES.DONE]: TASK_STATUSES.IN_PROGRESS,
};

export const statusThemeMap = {
  [TASK_STATUSES.TO_DO]: 'primary2',
  [TASK_STATUSES.IN_PROGRESS]: 'primary3',
  [TASK_STATUSES.DONE]: 'primary',
  [TASK_STATUSES.ARCHIVED]: 'grey',
};
