import { describe, expect, it, vi } from "vitest";
import { execa } from "execa";
import { execute } from "./execute.js";

vi.mock("execa");

describe("Execute command", () => {
  it("should call a child process library with correct arguments", async () => {
    const command = "cmd";
    const args = ["arg", "--flag"];
    const options = { cwd: "./" };

    await execute(command)(args, options);

    expect(execa).toBeCalledWith(command, args, options);
  });
});
