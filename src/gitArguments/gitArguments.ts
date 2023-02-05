import type { GitArgumentsOptions } from "../types.js";

export function gitArguments(options: GitArgumentsOptions): readonly string[] {
  const { untracked } = options;
  return [
    "status",
    "--porcelain",
    "--no-renames",
    `--untracked-files=${untracked ? "all" : "no"}`,
  ];
}
