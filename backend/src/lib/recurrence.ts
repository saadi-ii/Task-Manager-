export const RECURRENCE_VALUES = ["once", "daily", "weekly", "monthly", "yearly"] as const
export type Recurrence = typeof RECURRENCE_VALUES[number]

export const isRecurrence = (value: unknown): value is Recurrence =>
    typeof value === "string" && (RECURRENCE_VALUES as readonly string[]).includes(value)

const pad = (n: number) => String(n).padStart(2, "0")
const toYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const todayYMD = (): string => toYMD(new Date())

export const isDateInPast = (dateStr?: string): boolean => {
    if (!dateStr) return false
    return dateStr < todayYMD()
}
const parseYMD = (s: string) => {
    const [y, m, d] = s.split("-").map(Number)
    return new Date(y, (m || 1) - 1, d || 1)
}

export const endOfPeriod = (recurrence: Recurrence, from: Date = new Date()): string | undefined => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
    switch (recurrence) {
        case "daily":
            return toYMD(d)
        case "weekly": {
            const daysUntilSunday = (7 - d.getDay()) % 7
            d.setDate(d.getDate() + daysUntilSunday)
            return toYMD(d)
        }
        case "monthly": {
            d.setMonth(d.getMonth() + 1, 0)
            return toYMD(d)
        }
        case "yearly": {
            d.setMonth(11, 31)
            return toYMD(d)
        }
        default:
            return undefined
    }
}

export const isExpired = (dateStr?: string): boolean => {
    if (!dateStr) return false
    const stored = parseYMD(dateStr)
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return stored.getTime() < startOfToday.getTime()
}

export const nextPeriodFrom = (recurrence: Recurrence, lastDate: string): string | undefined => {
    const base = parseYMD(lastDate)
    base.setDate(base.getDate() + 1)
    return endOfPeriod(recurrence, base)
}
