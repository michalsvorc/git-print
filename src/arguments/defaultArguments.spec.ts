import { describe, expect, it } from "vitest";
import { defaultArguments } from "./defaultArguments.js";

describe("Default arguments", () => {
  it("should have pre-defined values", () => {
    expect(defaultArguments).toStrictEqual({
      deleted: true,
      staged: true,
      stagedOnly: false,
      unstaged: true,
      untracked: true,
    });
  });
});
