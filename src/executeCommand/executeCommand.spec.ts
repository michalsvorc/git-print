import { executeCommand } from "./executeCommand";

import execa from "execa";
import { mocked } from "ts-jest/utils";

jest.mock("execa");

const mockedExeca = mocked(execa);

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
