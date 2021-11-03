function parseArgv(arg: undefined): undefined;
function parseArgv(arg: boolean): boolean;
function parseArgv(arg: "true" | "false"): boolean;
function parseArgv(arg: string): string;
function parseArgv(
  arg: undefined | boolean | "true" | "false" | string
): undefined | boolean | string {
  if (arg === undefined || typeof arg === "boolean") return arg;

  if (arg?.toLowerCase() === "true") return true;
  if (arg?.toLowerCase() === "false") return false;

  return arg;
}

export { parseArgv };
