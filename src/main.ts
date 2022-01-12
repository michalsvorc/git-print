import minimist from "minimist";

import { addPathToFilenames } from "./addPathToFilenames";
import { createFileOutput } from "./createFileOutput";
import { createStatusDictionary } from "./createStatusDictionary";
import { executeCommand } from "./executeCommand";
import { filterStatusDictionary } from "./filterStatusDictionary";
import { gitArguments } from "./gitArguments";
import { gitRoot } from "./gitRoot/gitRoot";
import { parseArgv } from "./parseArgv";
import { FilterOptions, Path } from "./types";

export async function main(): Promise<ReadonlyArray<string>> {
  const {
    cwd: argvCWd,
    deleted: argvDeleted,
    staged: argvStaged,
    unstaged: argvUnstaged,
    untracked: argvUntracked,
    "staged-only": argvStagedOnly,
  } = minimist(process.argv.slice(2));

  const cwd: Path = parseArgv(argvCWd) || (await gitRoot()).stdout;
  const deleted: boolean = parseArgv(argvDeleted) ?? true;
  const staged: boolean = parseArgv(argvStaged) ?? true;
  const stagedOnly: boolean = parseArgv(argvStagedOnly) ?? false;
  const unstaged: boolean = parseArgv(argvUnstaged) ?? true;
  const untracked: boolean = parseArgv(argvUntracked) ?? true;

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
