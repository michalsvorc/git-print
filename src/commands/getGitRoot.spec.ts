import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { getGitRoot } from "./getGitRoot.js";

vi.mock("execa");

describe("Get git root", () => {
  it("should return full path to the parent directory with .git/", async () => {
    const command = "git";
    const args = ["rev-parse", "--show-toplevel"];
    const options = undefined;

    await getGitRoot();

    expect(execa).toBeCalledWith(command, args, options);
  });
});
