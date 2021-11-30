import { Temporal } from "@js-temporal/polyfill"
import { formatAnniversary, formatDuration, locale, unitName } from "./l10n"
import { TemporalUnit } from "./temporal-units"

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

const ageFull = birth.until(now, {
    largestUnit: 'years',
})
durations.push(formatDuration(ageFull, ['years', 'months', 'days']));

const ageWeeks = birth.until(now, {
    largestUnit: 'weeks',
})
durations.push(formatDuration(ageWeeks, ['weeks', 'days']));

const ageDays = birth.until(now, {
    largestUnit: 'days',
})
durations.push(formatDuration(ageDays, ['days', 'hours', 'minutes']));

const totalYears = birth.until(now).total({ unit: 'years', relativeTo: birth })
durations.push(totalYears.toLocaleString(locale) + ' ' + unitName('years', totalYears))


// calculate cool dates
const d: [TemporalUnit, number][] = [
    ["seconds", 10_000_000],
    ["hours",   10_000],
    ["minutes", 1_000_000],
    ["weeks",   100],
    ["days",    1000],
]

const dates: string[] = d.map(([unit, count]) =>
    formatAnniversary(unit, count, birth.add(Temporal.Duration.from({ [unit]: count })))
)

export { durations, dates }