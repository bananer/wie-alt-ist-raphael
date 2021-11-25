import { Temporal } from "@js-temporal/polyfill"

const timeZone = 'Europe/Berlin'
const birth = Temporal.ZonedDateTime.from({
    timeZone,
    year: 2021,
    month: 9,
    day: 16,
    hour: 16,
    minute: 9,
})
const now = Temporal.Now.zonedDateTimeISO(timeZone)


const durations: string[] = []

type Unit = ('years'|'months'|'weeks'|'days'|'hours'|'minutes'|'seconds')
const fieldNames: { [k in Unit]: [string, string] } = {
    years: ['Jahr', 'Jahre'],
    months: ['Monat', 'Monate'],
    weeks: ['Woche', 'Wochen'],
    days: ['Tag', 'Tage'],
    hours: ['Stunde', 'Stunden'],
    minutes: ['Minute', 'Minuten'],
    seconds: ['Sekunde', 'Sekunden'],
}

function fmt(duration: Temporal.Duration, fields: Unit[]) {
    return fields.map(f => {
        const val = duration[f];
        return `${val} ${fieldNames[f]![val == 1 ? 0 : 1]}`
    }).join(", ")
}

const ageFull = birth.until(now, {
    largestUnit: 'years',
})
durations.push(fmt(ageFull, ['years', 'months', 'days']));

const ageWeeks = birth.until(now, {
    largestUnit: 'weeks',
})
durations.push(fmt(ageWeeks, ['weeks', 'days']));

const ageDays = birth.until(now, {
    largestUnit: 'days',
})
durations.push(fmt(ageDays, ['days', 'hours', 'minutes']));

const totalYears = birth.until(now).total({ unit: 'years', relativeTo: birth })
durations.push(`${totalYears.toLocaleString('de')} Jahre`)

export { durations }