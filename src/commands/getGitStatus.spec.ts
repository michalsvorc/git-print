import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { getGitStatus } from "./getGitStatus.js";

vi.mock("execa");

describe("Get git status", () => {
  const command = "git";
  const baseArgs = ["status", "--porcelain", "--no-renames"];
  const cwd = "/test/";
  const options = { cwd };

  it("should return git status output INCLUDING untracked files", async () => {
    const showUntrackedFiles = true;
    const args = [...baseArgs, "--untracked-files=all"];

    await getGitStatus(showUntrackedFiles, cwd);

    expect(execa).toBeCalledWith(command, args, options);
  });

  it("should return git status output EXCLUDING untracked files", async () => {
    const showUntrackedFiles = false;
    const args = [...baseArgs, "--untracked-files=no"];

    await getGitStatus(showUntrackedFiles, cwd);

    expect(execa).toBeCalledWith(command, args, options);
  });
});
