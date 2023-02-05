import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { gitRoot } from "./gitRoot.js";

vi.mock("execa");

describe("Git root", () => {
  it("should return full path to the root directory with .git repository data", async () => {
    const command = "git";
    const args = ["rev-parse", "--show-toplevel"];
    const options = undefined;

    await gitRoot();

    expect(execa).toBeCalledWith(command, args, options);
  });
});
