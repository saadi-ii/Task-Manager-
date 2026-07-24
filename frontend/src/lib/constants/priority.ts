export const PRIORITY_OPTIONS = ["urgent", "high", "normal", "low"] as const;

export type Priority = (typeof PRIORITY_OPTIONS)[number];
