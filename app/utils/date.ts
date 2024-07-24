import { DateTime } from "luxon"

const customizeRelativeDate = (relativeDate: string | null) => {
    if (relativeDate) {
        return relativeDate
            .replace("hours", "hrs")
            .replace("hour", "hr")
            .replace("minutes", "min")
            .replace("minute", "min")
            .replace("seconds", "sec")
            .replace("second", "sec")
    }
}

export const formatDate = (dateString: string, format = "") => {
    const date = DateTime.fromISO(dateString)
    if (format) {
        return date.toFormat(format);
    }

    const now = DateTime.now();
    // if the date is within the last 7 dats
    if (date.hasSame(now, "day")) {
        // console.log(date.toRelative());
        return customizeRelativeDate(date.toRelative());
    }
    // Checking if it is yestrday
    else if (date.hasSame(now.minus({ days: 1 }), "day")) {
        return 'Yestrday'
    }
    // Checking if it is the day before yesterday
    else if (date > now.minus({ days: 6 })) {
        // 'EEE' gives you short day names (e.g., Mon, Tue)
        return date.toFormat("EEE")
    }
    else {
        // Older than a week show full date
        return date.toFormat("dd LLL yyyy");
    }
}