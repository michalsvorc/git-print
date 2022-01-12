import execa from "execa";

import { gitRoot } from "./gitRoot";

jest.mock("execa");

const mockedExeca = jest.mocked(execa);

describe("Git root", () => {
  it("should return full path to the root directory with .git repository data", async () => {
    const command = "git";
    const args = ["rev-parse", "--show-toplevel"];
    const options = undefined;

    await gitRoot();

    expect(mockedExeca).toBeCalledWith(command, args, options);
  });
});
