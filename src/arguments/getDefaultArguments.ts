import type { Arguments } from "../types.js";

export function getDefaultArguments(cwd: string): Arguments {
  if (!cwd) throw new Error("CWD path must be provided to default arguments.");
  return {
    cwd,
    deleted: true,
    staged: true,
    stagedOnly: false,
    unstaged: true,
    untracked: true,
  };
}
