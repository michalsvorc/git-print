// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function castArgToBoolean(arg: any): boolean {
  return String(arg).toLowerCase() === "true";
}
