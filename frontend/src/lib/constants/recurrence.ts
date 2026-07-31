export const RECURRENCE_OPTIONS = ["once", "daily", "weekly", "monthly", "yearly"] as const;

export type Recurrence = (typeof RECURRENCE_OPTIONS)[number];

export const RECURRENCE_LABEL: Record<Recurrence, string> = {
    once: "One-off",
    daily: "Daily (ends tonight)",
    weekly: "Weekly (ends Sunday)",
    monthly: "Monthly (ends this month)",
    yearly: "Yearly (ends this year)",
};
