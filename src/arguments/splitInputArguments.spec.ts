import type { CWDArguments, GitStatusArguments } from "src/types.js";
import { describe, expect, it } from "vitest";
import { splitInputArguments } from "./splitInputArguments.js";

describe("Split input arguments to dedicated argument objects", () => {
  it("should return normalized cwd and git status argument objects", () => {
    const cwdInputArguments: CWDArguments = { cwd: "/path/to/cwd" };
    const gitStatusInputArguments: GitStatusArguments = {
      deleted: true,
      staged: true,
      stagedOnly: true,
      unstaged: true,
      untracked: true,
    };

    const inputArguments = {
      ...cwdInputArguments,
      ...gitStatusInputArguments,
    };

    const result = splitInputArguments(inputArguments);

    expect(result).toStrictEqual({
      cwdInputArguments,
      gitStatusInputArguments,
    });
  });

  it("should return empty objects when NO arguments are provided", () => {
    const cwdInputArguments: Partial<CWDArguments> = { cwd: undefined };
    const gitStatusInputArguments: Partial<GitStatusArguments> = {
      deleted: undefined,
      staged: undefined,
      stagedOnly: undefined,
      unstaged: undefined,
      untracked: undefined,
    };

    const result = splitInputArguments(undefined);

    expect(result).toStrictEqual({
      cwdInputArguments,
      gitStatusInputArguments,
    });
  });

  it("should return empty objects when NO arguments are provided", () => {
    const cwdInputArguments: Partial<CWDArguments> = { cwd: undefined };
    const gitStatusInputArguments: Partial<GitStatusArguments> = {
      deleted: undefined,
      staged: undefined,
      stagedOnly: undefined,
      unstaged: undefined,
      untracked: undefined,
    };

    const result = splitInputArguments({});

    expect(result).toStrictEqual({
      cwdInputArguments,
      gitStatusInputArguments,
    });
  });
});
