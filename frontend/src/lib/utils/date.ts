const pad = (n: number) => String(n).padStart(2, "0");

export const todayYMD = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
