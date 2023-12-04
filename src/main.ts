import type {
  GitStatusArguments,
  InputArguments,
  StatusDictionary,
  StatusOutput,
} from "./types.js";
import { UnresolvedCWDError } from "./errors.js";
import { createStatusDictionary } from "./statusDictionary/createStatusDictionary.js";
import { defaultGitStatusArguments } from "./arguments/defaultArguments.js";
import { filterStatusDictionary } from "./statusDictionary/filterStatusDictionary.js";
import { getGitStatus } from "./commands/getGitStatus.js";
import { stagedOnlyFilterOptions } from "./arguments/stagedOnlyFilterOptions.js";
import { parseCWDInputArguments } from "./arguments/parseCWDInputArguments.js";
import { parseGitStatusInputArguments } from "./arguments/parseGitStatusInputArguments.js";
import { splitInputArguments } from "./arguments/splitInputArguments.js";

export async function main(
  inputArguments?: InputArguments
): Promise<StatusDictionary> {
  const { cwdInputArguments, gitStatusInputArguments } =
    splitInputArguments(inputArguments);
  let cwd: string;
  try {
    cwd = await parseCWDInputArguments(cwdInputArguments.cwd);
    if (!cwd) {
      throw new Error("CWD is an empty value");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new UnresolvedCWDError(error.message);
    } else {
      throw error;
    }
  }

  const gitStatusArguments: GitStatusArguments = parseGitStatusInputArguments(
    gitStatusInputArguments
  );

  const gitStatus: string = (await getGitStatus(cwd)).stdout;

  const emptyResult: StatusDictionary = new Map();

  if (!gitStatus.length) return emptyResult;

  const statusOutput: StatusOutput = gitStatus.split("\n");

  const statusDictionary: StatusDictionary = createStatusDictionary(
    cwd,
    statusOutput
  );

  if (!inputArguments || !Object.keys(inputArguments).length)
    return statusDictionary;

  // currying?
  //TODO test
  const filteredStatusDictionary: StatusDictionary = filterStatusDictionary(
    statusDictionary
  )(
    Object.assign(
      { ...defaultGitStatusArguments },
      { ...gitStatusArguments },
      gitStatusArguments.stagedOnly && stagedOnlyFilterOptions
    )
  );

  if (!filteredStatusDictionary.size) return emptyResult;

  return filteredStatusDictionary;
}
