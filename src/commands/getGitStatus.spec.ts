import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { getGitStatus } from "./getGitStatus.js";

vi.mock("execa");

describe("Get git status", () => {
  const command = "git";
  const args = [
    "status",
    "--porcelain",
    "--no-renames",
    "--untracked-files=all",
  ];
  const cwd = "/test/";
  const options = { cwd };

  it("should return git status output", async () => {
    await getGitStatus(cwd);

    expect(execa).toBeCalledWith(command, args, options);
  });
});
