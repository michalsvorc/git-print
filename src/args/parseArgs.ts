import type { Arguments } from "./Arguments.type.js";
import type { ParsedArgs } from "minimist";
import { castArgToBoolean } from "./castArgToBoolean.js";

export function parseArgs(args: ParsedArgs): Arguments {
  return {
    cwd: String(args.cwd),
    deleted: castArgToBoolean(args.deleted),
    staged: castArgToBoolean(args.staged),
    stagedOnly: castArgToBoolean(args.stagedOnly),
    unstaged: castArgToBoolean(args.unstaged),
    untracked: castArgToBoolean(args.untracked),
  };
}
