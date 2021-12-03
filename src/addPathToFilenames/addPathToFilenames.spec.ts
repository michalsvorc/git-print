import { Path } from "src/types";

import { addPathToFilenames } from "./addPathToFilenames";

const filenames: ReadonlyArray<Path> = ["filename.00", "filename.01"];

const cwd = "/path/to/cwd";

describe("Add path to an array of filenames", () => {
  it("should prepend passed CWD argument to every filename in an array", async () => {
    expect(addPathToFilenames(filenames)(cwd)).toStrictEqual([
      `${cwd}/${filenames[0]}`,
      `${cwd}/${filenames[1]}`,
    ]);
  });
});
