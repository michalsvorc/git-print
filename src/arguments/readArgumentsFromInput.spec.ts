import { describe, expect, it, vi } from "vitest";
import { getDefaultArguments } from "./getDefaultArguments.js";
import minimist from "minimist";
import { readArgumentsFromInput } from "./readArgumentsFromInput.js";

vi.mock("minimist");
vi.mock("../commands/getGitRoot.ts", () => ({
  getGitRoot: vi.fn().mockResolvedValue({ stdout: "/path/to/cwd" }),
}));

describe("Read arguments from CLI", () => {
  const defaultCWD = "/path/to/cwd";
  const defaultArguments = getDefaultArguments(defaultCWD);

  it("should call service for reading input", () => {
    readArgumentsFromInput(defaultArguments);

    expect(minimist).toHaveBeenCalledTimes(1);
    expect(minimist).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ boolean: true })
    );
  });

  it("should return default arguments when no input is present", () => {
    readArgumentsFromInput(defaultArguments);

    expect(minimist).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ default: getDefaultArguments(defaultCWD) })
    );
  });
});
