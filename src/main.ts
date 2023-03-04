import { createStatusDictionary } from "./statusDictionary/createStatusDictionary.js";
import { filterStatusDictionary } from "./statusDictionary/filterStatusDictionary.js";
import { formatOutput } from "./output/formatOutput.js";
import { getArgs } from "./args/getArgs.js";
import { getGitStatus } from "./commands/getGitStatus.js";
import { parseArgs } from "./args/parseArgs.js";
import { resolveAbsolutePaths } from "./output/resolveAbsolutePaths.js";
import { stagedOnlyFilterOptions } from "./args/stagedOnlyFilterOptions.js";

type Result = readonly string[];

export async function main(): Promise<Result> {
  const emptyResult: Result = [];
  const inputArgs = getArgs();
  const { cwd, deleted, staged, stagedOnly, unstaged, untracked } =
    parseArgs(inputArgs);
  const showUntrackedFiles: boolean = untracked && !stagedOnly;
  const { stdout: gitStatus } = await getGitStatus(cwd, showUntrackedFiles);

  if (!gitStatus.length) return emptyResult;

  const statusDictionary = createStatusDictionary(gitStatus.split("\n"));
  const filteredStatusDictionary = filterStatusDictionary(statusDictionary)(
    Object.assign(
      {
        deleted,
        staged,
        unstaged,
      },
      stagedOnly ? stagedOnlyFilterOptions : {}
    )
  );

  if (!filteredStatusDictionary.size) return emptyResult;

  const formattedOutput = formatOutput(filteredStatusDictionary);
  const result = resolveAbsolutePaths(cwd, formattedOutput);

  return result;
}
