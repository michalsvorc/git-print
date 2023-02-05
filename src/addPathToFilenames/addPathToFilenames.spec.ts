import { describe, expect, it } from "vitest";
import { addPathToFilenames } from "./addPathToFilenames.js";

const filenames: readonly string[] = ["filename.00", "filename.01"];

const cwd = "/path/to/cwd";

describe("Add path to an array of filenames", () => {
  it("should prepend passed CWD argument to every filename in an array", () => {
    expect(addPathToFilenames(filenames)(cwd)).toStrictEqual([
      `${cwd}/${filenames[0]}`,
      `${cwd}/${filenames[1]}`,
    ]);
  });
});
