import { usaDateFormat } from "constants/dateFormat";
import { EVENT_REPEATS, stringifyEnumValue } from "constants/enums"
import { format } from "helpers/date"
import { t } from "helpers/react"

export const styles = {
    createdFeatures: (theme) => ({
        label: { color: theme['color-primary-700'], fontSize: 16 },
        row: { marginTop: 3 },
        content: { color: theme['grey-300'] },
        container: { marginTop: 1, pb: 36 }
    }),
    dueFeatures: (theme) => ({
        label: { textTransform: "uppercase", color: theme['color-primary-700'] },
        content: { color: theme['grey-400'], textTransform: "uppercase" },
        row: { marginTop: 1 }
    }),
};

export const getFeatureReminderFeatures = (due, reminder) => ([
    { icon: "calendar-outline", label: "Due", content: format(due, usaDateFormat+', KK:mm a', "", { toDate: true }) },
    { icon: "calendar-outline", label: "Reminder", content: stringifyEnumValue(EVENT_REPEATS, reminder?.repeat || null) + t(reminder?.endRepeat, `,Until ${format(reminder?.endRepeat, usaDateFormat, '', { toDate: true })}`, '') },
])

export const getCreatedFeatures = (user, createdAt) => ([
    { label: "Created By", content: user?.fullName },
    { label: "Date Created", content: format(createdAt, usaDateFormat, '', { toDate: true }) }
])
