import type { ParsedArgs as InputArguments } from "minimist";
type InputArgument = InputArguments[keyof InputArguments];

function castArgument<T>(
  castCallback: (argument: InputArgument) => T | undefined,
  argument: InputArgument | undefined
) {
  return argument !== undefined ? castCallback(argument) : undefined;
}

function castToBoolean(argument: InputArgument): boolean {
  return String(argument).toLowerCase() === "true";
}

export function castArgumentToBoolean(
  argument: InputArgument
): boolean | undefined {
  return castArgument(castToBoolean, argument);
}

export function castArgumentToString(
  argument: InputArgument
): string | undefined {
  return castArgument(String, argument);
}
