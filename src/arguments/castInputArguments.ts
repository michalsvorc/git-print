import { castArgumentToBoolean, castArgumentToString } from "./castArgument.js";
import type { InputArguments } from "../types.js";
import type { ParsedArgs } from "minimist";

export function castInputArguments(args: ParsedArgs): InputArguments {
  const cwd = castArgumentToString(args.cwd);
  const deleted = castArgumentToBoolean(args.deleted);
  const staged = castArgumentToBoolean(args.staged);
  const stagedOnly = castArgumentToBoolean(args.stagedOnly);
  const unstaged = castArgumentToBoolean(args.unstaged);
  const untracked = castArgumentToBoolean(args.untracked);

  return {
    cwd,
    deleted,
    staged,
    stagedOnly,
    unstaged,
    untracked,
  };
}
