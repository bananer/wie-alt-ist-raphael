import { Temporal } from "@js-temporal/polyfill";
import { TemporalUnit } from "./temporal-units";

export const locale = 'de'

const unitNames: { [k in TemporalUnit]: [string, string] } = {
    years: ['Jahr', 'Jahre'],
    months: ['Monat', 'Monate'],
    weeks: ['Woche', 'Wochen'],
    days: ['Tag', 'Tage'],
    hours: ['Stunde', 'Stunden'],
    minutes: ['Minute', 'Minuten'],
    seconds: ['Sekunde', 'Sekunden'],
}

export function unitName(u: TemporalUnit, val: number) {
    return unitNames[u]![val == 1 ? 0 : 1]
}

export function formatDuration(duration: Temporal.Duration, units: TemporalUnit[]) {
    return units.map(f => {
        const val = duration[f];
        return `${val.toLocaleString(locale)} ${unitName(f, val)}`
    }).join(", ")
}

export function formatAnniversary(u: TemporalUnit, val: number, dateTime: Temporal.ZonedDateTime) {
    return val.toLocaleString('de') + ' '  + unitName(u, val) + ' alt: ' +
        dateTime.toLocaleString(locale,  { dateStyle: 'long', timeStyle: 'short' })
}