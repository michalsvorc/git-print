import type { FilterOptions } from "./types.js";
import { createStatusDictionary } from "./createStatusDictionary/index.js";
import { execute } from "./commands/execute.js";
import { filterStatusDictionary } from "./filterStatusDictionary/index.js";
import { getArgs } from "./args/getArgs.js";
import { gitArguments } from "./gitArguments/index.js";
import { parseArgs } from "./args/parseArgs.js";
import { parseOutput } from "./services/parseOutput.js";
import { resolveAbsolutePaths } from "./services/resolveAbsolutePaths.js";

const stagedOnlyFilterOptions: FilterOptions = {
  deleted: false,
  staged: true,
  unstaged: false,
};

export function main(): Promise<readonly string[]> {
  const inputArgs = getArgs();
  const args = parseArgs(inputArgs);

  const command = "git";
  const commandArguments = gitArguments({
    untracked: args.untracked && !args.stagedOnly,
  });
  const commandOptions = { cwd: args.cwd };

  return execute(command)(commandArguments, commandOptions)
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

      return parseOutput(filteredStatusDictionary);
    })
    .then((output) => resolveAbsolutePaths(args.cwd)(output));
}
