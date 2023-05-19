import type { Arguments } from "../types.js";
import minimist from "minimist";

export function readArgumentsFromInput(defaultArguments: Arguments) {
  return minimist(process.argv.slice(2), {
    boolean: true,
    default: defaultArguments,
  });
}
