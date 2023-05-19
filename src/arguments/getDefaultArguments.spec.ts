import { describe, expect, it } from "vitest";
import { getDefaultArguments } from "./getDefaultArguments.js";

describe("Get default arguments", () => {
  it("should return object with default arguments", () => {
    const cwd = "/cwd/path";

    expect(getDefaultArguments(cwd)).toStrictEqual({
      cwd,
      deleted: true,
      staged: true,
      stagedOnly: false,
      unstaged: true,
      untracked: true,
    });
  });

  it("should throw an Error when cwd is not provided", () => {
    expect(() => getDefaultArguments("")).toThrowError();
  });
});
