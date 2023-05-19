import type { Arguments } from "../types.js";
import type { ParsedArgs as ParsedArguments } from "minimist";
import { castArgumentToBoolean } from "./castArgumentToBoolean.js";

export function parseArguments(args: ParsedArguments): Arguments {
  return {
    cwd: String(args.cwd),
    deleted: castArgumentToBoolean(args.deleted),
    staged: castArgumentToBoolean(args.staged),
    stagedOnly: castArgumentToBoolean(args.stagedOnly),
    unstaged: castArgumentToBoolean(args.unstaged),
    untracked: castArgumentToBoolean(args.untracked),
  };
}
