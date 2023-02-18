import { describe, expect, it } from "vitest";
import { parseArgs } from "./parseArgs.js";

describe("parse input arguments", () => {
  it("should cast to correct types", () => {
    const args = parseArgs({
      _: [],
      cwd: "cwd",
      deleted: "true",
      staged: "true",
      stagedOnly: "true",
      unstaged: "true",
      untracked: "true",
    });

    expect(args.cwd).toBe("cwd");
    expect(args.deleted).toBe(true);
    expect(args.staged).toBe(true);
    expect(args.stagedOnly).toBe(true);
    expect(args.unstaged).toBe(true);
    expect(args.untracked).toBe(true);
  });
});
