import type { FilterOptions } from "./types.js";
import { addPathToFilenames } from "./addPathToFilenames/index.js";
import { createFileOutput } from "./createFileOutput/index.js";
import { createStatusDictionary } from "./createStatusDictionary/index.js";
import { executeCommand } from "./executeCommand/index.js";
import { filterStatusDictionary } from "./filterStatusDictionary/index.js";
import { gitArguments } from "./gitArguments/index.js";
import { gitRoot } from "./gitRoot/index.js";
import minimist from "minimist";
// import { parseArgv } from "./parseArgv/index.js";

export async function main(): Promise<readonly string[]> {
  const parsedArgs = minimist(process.argv.slice(2), {
    boolean: true,
    default: {
      cwd: (await gitRoot()).stdout,
      deleted: true,
      staged: true,
      stagedOnly: false,
      unstaged: true,
      untracked: true,
    },
  });

  const cwd = parsedArgs.cwd as string;
  const deleted = parsedArgs.deleted as boolean;
  const staged = parsedArgs.staged as boolean;
  const unstaged = parsedArgs.unstaged as boolean;
  const untracked = parsedArgs.untracked as boolean;
  const stagedOnly = parsedArgs.stagedOnly as boolean;

  const stagedOnlyFilterOptions: FilterOptions = {
    deleted: false,
    staged: true,
    unstaged: false,
  };

  return executeCommand("git")(
    gitArguments({ untracked: untracked && !stagedOnly })
  )({ cwd })
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
            deleted,
            staged,
            unstaged,
          },
          stagedOnly ? stagedOnlyFilterOptions : {}
        )
      )
    )
    .then((filteredStatusDictionary) => {
      /*eslint-disable-next-line no-process-exit */
      if (!filteredStatusDictionary.size) process.exit(1);

      return createFileOutput(filteredStatusDictionary);
    })
    .then((output) => addPathToFilenames(output)(cwd));
}
