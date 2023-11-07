import { describe, expect, it } from "vitest";
import type { GitStatusArguments } from "../types.js";
import { defaultGitStatusArguments } from "./defaultArguments.js";
import { getArgumentFrom } from "./getArgumentFrom.js";

describe("get argument from", () => {
  it("should retrieve argument value by key when arguments object IS provided", () => {
    const args = {
      staged: false,
      deleted: false,
    } as GitStatusArguments;
    const key = "staged";
    expect(getArgumentFrom(defaultGitStatusArguments, args)(key)).toBe(
      args[key]
    );
  });

  it("should retrieve default argument value by key when argument key IS NOT provided", () => {
    const args = {
      deleted: false,
    } as GitStatusArguments;
    const key = "staged";
    expect(getArgumentFrom(defaultGitStatusArguments, args)(key)).toBe(
      defaultGitStatusArguments[key]
    );
  });

  it("should retrieve default argument value by key when arguments object IS NOT provided", () => {
    const args = undefined;
    const key = "staged";
    expect(getArgumentFrom(defaultGitStatusArguments, args)(key)).toBe(
      defaultGitStatusArguments[key]
    );
  });

  it("should throw an error", () => {
    const args = undefined;
    const key = "staged";
    expect(getArgumentFrom(defaultGitStatusArguments, args)(key)).toBe(
      defaultGitStatusArguments[key]
    );
  });
});
