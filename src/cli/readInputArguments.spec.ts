import { beforeEach, describe, expect, it, vi } from "vitest";
import minimist from "minimist";
import { readInputArguments } from "./readInputArguments.js";

vi.mock("minimist");
vi.mock("../commands/getGitRoot.ts", () => ({
  getGitRoot: vi.fn().mockResolvedValue({ stdout: "/path/to/cwd" }),
}));

describe("Read input arguments from CLI", () => {
  const processArgvOriginal = process.argv;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    process.argv = [...processArgvOriginal];
  });

  it("should call service for reading input arguments arg1 and arg2", () => {
    const arg1 = "--arg1";
    const arg2 = "--arg2";
    process.argv = ["/path/to/node", "/path/to/script", arg1, arg2];
    readInputArguments();

    expect(minimist).toHaveBeenCalledTimes(1);
    expect(minimist).toHaveBeenCalledWith(
      [arg1, arg2],
      expect.objectContaining({ boolean: true })
    );
  });
});
