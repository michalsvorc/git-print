import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { executeCommand } from "./executeCommand.js";

vi.mock("execa");

describe("Git execution", () => {
  it("should call a child process library with correct arguments", async () => {
    const command = "git";
    const args = ["status", "--porcelain"];
    const options = { cwd: "./" };

    await executeCommand(command)(args)(options);

    expect(execa).toBeCalledWith(command, args, options);
  });
});
