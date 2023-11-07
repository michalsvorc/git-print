import type { GitStatusArguments } from "../types.js";

export function getArgumentFrom(
  defaultGitStatusArguments: GitStatusArguments,
  args?: Partial<GitStatusArguments>
) {
  return function getArgumentByKey(key: keyof GitStatusArguments) {
    return args?.[key] ?? defaultGitStatusArguments[key];
  };
}
