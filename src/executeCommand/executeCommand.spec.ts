import execa from "execa";

import { executeCommand } from "./executeCommand";

jest.mock("execa");

const mockedExeca = jest.mocked(execa);

describe("Git execution", () => {
  it("should call a child process library with correct arguments", async () => {
    const command = "git";
    const args = ["status", "--porcelain"];
    const cwd = "./";

    await executeCommand(command)(args)(cwd);

    expect(mockedExeca).toBeCalledWith(command, args, {
      cwd,
    });
  });
});
