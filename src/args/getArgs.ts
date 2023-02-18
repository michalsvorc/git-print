import defaultArgs from "./defaultArgs.js";
import minimist from "minimist";

export function getArgs() {
  return minimist(process.argv.slice(2), {
    boolean: true,
    default: defaultArgs,
  });
}
