// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function castArgumentToBoolean(arg: any): boolean {
  return String(arg).toLowerCase() === "true";
}
