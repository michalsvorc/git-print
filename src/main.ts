import type { FilterOptions } from "./types.js";
import { createStatusDictionary } from "./createStatusDictionary/index.js";
import { execute } from "./commands/execute.js";
import { filterStatusDictionary } from "./filterStatusDictionary/index.js";
import { getArgs } from "./args/getArgs.js";
import { parseArgs } from "./args/parseArgs.js";
import { parseOutput } from "./services/parseOutput.js";
import { resolveAbsolutePaths } from "./services/resolveAbsolutePaths.js";

const stagedOnlyFilterOptions: FilterOptions = {
  deleted: false,
  staged: true,
  unstaged: false,
};

type Result = readonly string[];

export async function main(): Promise<Result> {
  const emptyResult: Result = [];
  const inputArgs = getArgs();
  const args = parseArgs(inputArgs);
  const showUntrackedFiles: boolean = args.untracked && !args.stagedOnly;

  const command = "git";
  const commandArguments = [
    "status",
    "--porcelain",
    "--no-renames",
    `--untracked-files=${showUntrackedFiles ? "all" : "no"}`,
  ];
  const commandOptions = { cwd: args.cwd };

  const gitStatusExecution = await execute(command)(
    commandArguments,
    commandOptions
  );
  const { stdout } = gitStatusExecution;
  if (!stdout.length) return emptyResult;

  const statusDictionary = createStatusDictionary(stdout.split("\n"));
  const filteredStatusDictionary = filterStatusDictionary(statusDictionary)(
    Object.assign(
      {
        deleted: args.deleted,
        staged: args.staged,
        unstaged: args.unstaged,
      },
      args.stagedOnly ? stagedOnlyFilterOptions : {}
    )
  );

  if (!filteredStatusDictionary.size) return emptyResult;

  const parsedOutput = parseOutput(filteredStatusDictionary);

  const result = resolveAbsolutePaths(args.cwd)(parsedOutput);

  return result;
}
