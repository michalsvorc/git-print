import { GitArgumentsOptions } from "../types";

export function gitArguments(
  options: GitArgumentsOptions
): ReadonlyArray<string> {
  const { untracked } = options;
  return [
    "status",
    "--porcelain",
    "--no-renames",
    `--untracked-files=${untracked ? "all" : "no"}`,
  ];
}
