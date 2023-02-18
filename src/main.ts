import type { FilterOptions } from "./types.js";
import { addPathToFilenames } from "./addPathToFilenames/index.js";
import { createFileOutput } from "./createFileOutput/index.js";
import { createStatusDictionary } from "./createStatusDictionary/index.js";
import { executeCommand } from "./executeCommand/index.js";
import { filterStatusDictionary } from "./filterStatusDictionary/index.js";
import { getArgs } from "./args/getArgs.js";
import { gitArguments } from "./gitArguments/index.js";
import { parseArgs } from "./args/parseArgs.js";

const stagedOnlyFilterOptions: FilterOptions = {
  deleted: false,
  staged: true,
  unstaged: false,
};

export async function main(): Promise<readonly string[]> {
  const inputArgs = getArgs();
  const args = parseArgs(inputArgs);

  return executeCommand("git")(
    gitArguments({ untracked: args.untracked && !args.stagedOnly })
  )({ cwd: args.cwd })
    .then((result) => {
      const { stdout } = result;

      /*eslint-disable-next-line no-process-exit */
      if (!stdout.length) process.exit(1);

      return createStatusDictionary(stdout.split("\n"));
    })
    .then((statusDictionary) =>
      filterStatusDictionary(statusDictionary)(
        Object.assign(
          {
            deleted: args.deleted,
            staged: args.staged,
            unstaged: args.unstaged,
          },
          args.stagedOnly ? stagedOnlyFilterOptions : {}
        )
      )
    )
    .then((filteredStatusDictionary) => {
      /*eslint-disable-next-line no-process-exit */
      if (!filteredStatusDictionary.size) process.exit(1);

      return createFileOutput(filteredStatusDictionary);
    })
    .then((output) => addPathToFilenames(output)(args.cwd));
}
