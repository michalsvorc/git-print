import { describe, expect, it } from "vitest";
import { defaultGitStatusArguments } from "./defaultArguments.js";

describe("Default arguments", () => {
  it("should have pre-defined values", () => {
    expect(defaultGitStatusArguments).toStrictEqual({
      deleted: true,
      staged: true,
      stagedOnly: false,
      unstaged: true,
      untracked: true,
    });
  });
});
