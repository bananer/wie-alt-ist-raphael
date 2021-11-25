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

// calculate durations
const durations: string[] = []

type Unit = ('years'|'months'|'weeks'|'days'|'hours'|'minutes'|'seconds')
const unitNames: { [k in Unit]: [string, string] } = {
    years: ['Jahr', 'Jahre'],
    months: ['Monat', 'Monate'],
    weeks: ['Woche', 'Wochen'],
    days: ['Tag', 'Tage'],
    hours: ['Stunde', 'Stunden'],
    minutes: ['Minute', 'Minuten'],
    seconds: ['Sekunde', 'Sekunden'],
}

function unitName(u: Unit, val: number) {
    return unitNames[u]![val == 1 ? 0 : 1]
}

function fmt(duration: Temporal.Duration, units: Unit[]) {
    return units.map(f => {
        const val = duration[f];
        return `${val} ${unitName(f, val)}`
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


// calculate cool dates
const d: [Unit, number][] = [
    ["seconds", 10_000_000],
    ["hours",   10_000],
    ["minutes", 1_000_000],
    ["weeks",   100],
    ["days",    1000],
]

const dates: string[] = d.map(([unit, count]) => count.toLocaleString('de') + ' ' +
    unitName(unit, count) + ' alt: ' +
    birth.add(Temporal.Duration.from({[unit]: count})).toLocaleString('de')
)


export { durations, dates }