import minimist from "minimist";

export function readInputArguments() {
  return minimist(process.argv.slice(2), {
    boolean: true,
  });
}
