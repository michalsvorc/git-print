import { createStatusDictionary } from "./statusDictionary/createStatusDictionary.js";
import { filterStatusDictionary } from "./statusDictionary/filterStatusDictionary.js";
import { formatOutput } from "./output/formatOutput.js";
import { getDefaultArguments } from "./arguments/getDefaultArguments.js";
import { getGitRoot } from "./commands/getGitRoot.js";
import { getGitStatus } from "./commands/getGitStatus.js";
import { parseArguments } from "./arguments/parseArguments.js";
import { readArgumentsFromInput } from "./arguments/readArgumentsFromInput.js";
import { resolveAbsolutePaths } from "./output/resolveAbsolutePaths.js";
import { stagedOnlyFilterOptions } from "./arguments/stagedOnlyFilterOptions.js";

type Result = readonly string[];

export async function main(): Promise<Result> {
  const emptyResult: Result = [];
  const defaultCWD = (await getGitRoot()).stdout;
  const defaultArguments = getDefaultArguments(defaultCWD);
  const inputArgs = readArgumentsFromInput(defaultArguments);
  const { cwd, deleted, staged, stagedOnly, unstaged, untracked } =
    parseArguments(inputArgs);
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
