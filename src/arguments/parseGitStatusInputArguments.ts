import type { GitStatusArguments } from "../types.js";
import { defaultGitStatusArguments } from "../arguments/defaultArguments.js";
import { getArgumentFrom } from "../arguments/getArgumentFrom.js";

export function parseGitStatusInputArguments(
  gitStatusArguments: Partial<GitStatusArguments>
): GitStatusArguments {
  // if (args === undefined || !Object.keys(args).length) return defaultGitStatusArguments;

  const declaredValues = Object.entries(gitStatusArguments).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_key, value]) => typeof value !== "undefined"
  );

  if (!declaredValues.length) {
    return defaultGitStatusArguments;
  }

  const hasNonBooleanValues = declaredValues.filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_key, value]) => typeof value !== "boolean"
  );

  if (hasNonBooleanValues.length) {
    const keysWithNonBooleanValues = hasNonBooleanValues.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, _value]) => key
    );
    throw new Error(
      `Git status arguments must be of type Boolean. Incorrect values for arguments: ${keysWithNonBooleanValues.join(
        ","
      )}`
    );
  }

  const getArgumentByKey = getArgumentFrom(
    defaultGitStatusArguments,
    gitStatusArguments
  );

  const result = Object.keys(gitStatusArguments).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: getArgumentByKey(key as keyof GitStatusArguments),
    };
  }, defaultGitStatusArguments);

  return result;
}
