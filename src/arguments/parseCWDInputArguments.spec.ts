import { describe, expect, it, vi } from "vitest";
import { parseCWDInputArguments } from "./parseCWDInputArguments.js";

vi.mock("../commands/getGitRoot.ts", () => ({
  getGitRoot: vi.fn().mockResolvedValue({ stdout: "/path/to/git/root" }),
}));

describe("Parse CWD input arguments", () => {
  it("should return passed argument when IS defined", async () => {
    const argument = "/path/to/cwd";
    const result = await parseCWDInputArguments(argument);
    const expected = argument;

    expect(result).toBe(expected);
  });

  it("should return git root when argument IS NOT defined", async () => {
    const result = await parseCWDInputArguments(undefined);
    const expected = "/path/to/git/root";

    expect(result).toBe(expected);
  });
});
