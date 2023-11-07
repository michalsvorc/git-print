import type { GitStatusArguments } from "src/types.js";
import { describe, expect, it } from "vitest";
import { defaultGitStatusArguments } from "./defaultArguments.js";
import { parseGitStatusInputArguments } from "./parseGitStatusInputArguments.js";

describe("Parse git status input arguments", () => {
  // it.skip("should return default arguments when arguments ARE NOT defined", () => {
  //   const args = undefined;
  //   const expected = defaultGitStatusArguments;
  //   const result = parseGitStatusInputArguments(args);

  //   expect(result).toStrictEqual(expected);
  // });

  // it.skip("should return default arguments when arguments ARE empty object", () => {
  //   const args = {};
  //   const expected = defaultGitStatusArguments;
  //   const result = parseGitStatusInputArguments(args);

  //   expect(result).toStrictEqual(expected);
  // });

  it("should replace undefined values with default arguments", () => {
    const args = {
      deleted: !defaultGitStatusArguments.deleted,
      staged: !defaultGitStatusArguments.staged,
      stagedOnly: undefined,
      unstaged: undefined,
      untracked: undefined,
    };
    const expected: GitStatusArguments = {
      ...args,
      stagedOnly: defaultGitStatusArguments.stagedOnly,
      unstaged: defaultGitStatusArguments.unstaged,
      untracked: defaultGitStatusArguments.untracked,
    };
    const result = parseGitStatusInputArguments(args);

    expect(result).toStrictEqual(expected);
    expect(result).toStrictEqual(expected);
  });

  it("should replace ALL values with default arguments when ALL input arguments are NOT defined", () => {
    const args = {
      deleted: undefined,
      staged: undefined,
      stagedOnly: undefined,
      unstaged: undefined,
      untracked: undefined,
    };
    const expected: GitStatusArguments = defaultGitStatusArguments;
    const result = parseGitStatusInputArguments(args);

    expect(result).toStrictEqual(expected);
    expect(result).toStrictEqual(expected);
  });

  it("should NOT replace ANY values when ALL input arguments are defined", () => {
    const args = {
      deleted: !defaultGitStatusArguments.deleted,
      staged: !defaultGitStatusArguments.staged,
      stagedOnly: !defaultGitStatusArguments.stagedOnly,
      unstaged: !defaultGitStatusArguments.unstaged,
      untracked: !defaultGitStatusArguments.untracked,
    };
    const expected: GitStatusArguments = args;
    const result = parseGitStatusInputArguments(args);

    expect(result).toStrictEqual(expected);
    expect(result).toStrictEqual(expected);
  });
});
