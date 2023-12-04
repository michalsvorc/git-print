import { describe, expect, it } from "vitest";
import { castInputArguments } from "./castInputArguments.js";

describe("Cast input arguments", () => {
  it("should cast provided arguments to correct types", () => {
    const castedArguments = castInputArguments({
      _: [],
      cwd: "/cwd",
      deleted: "true",
      staged: "true",
      stagedOnly: "true",
      unstaged: "true",
      untracked: "true",
    });

    expect(castedArguments.cwd).toBe("/cwd");
    expect(castedArguments.deleted).toBe(true);
    expect(castedArguments.staged).toBe(true);
    expect(castedArguments.stagedOnly).toBe(true);
    expect(castedArguments.unstaged).toBe(true);
    expect(castedArguments.untracked).toBe(true);
  });

  it("should cast not provided arguments to undefined", () => {
    const castedArguments = castInputArguments({
      _: [],
      cwd: undefined,
      deleted: undefined,
      staged: undefined,
      stagedOnly: undefined,
      unstaged: undefined,
      untracked: undefined,
    });

    expect(castedArguments.cwd).toBe(undefined);
    expect(castedArguments.deleted).toBe(undefined);
    expect(castedArguments.staged).toBe(undefined);
    expect(castedArguments.stagedOnly).toBe(undefined);
    expect(castedArguments.unstaged).toBe(undefined);
    expect(castedArguments.untracked).toBe(undefined);
  });
});
