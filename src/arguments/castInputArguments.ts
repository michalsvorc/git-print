import { castArgumentToBoolean, castArgumentToString } from "./castArgument.js";
import type { Arguments } from "../types.js";
import type { ParsedArgs as InputArguments } from "minimist";

export function castInputArguments(args: InputArguments): Partial<Arguments> {
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
