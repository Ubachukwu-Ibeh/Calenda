export interface ICalendarArgs {
    month: string
}
export interface IInfo {
    dayNumber: number,
    dayOfWeek: string,
    monthOfYear: string,
    year: number,
    suffix: string
}
export interface IStructure {
    Sun: Array<number>,
    Mon: Array<number>,
    Tue: Array<number>,
    Wed: Array<number>,
    Thu: Array<number>,
    Fri: Array<number>,
    Sat: Array<number>
}