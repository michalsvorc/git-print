import { describe, expect, it } from "vitest";
import { resolveAbsolutePaths } from "./resolveAbsolutePaths.js";

describe("Resolve absolute paths", () => {
  const cwd = "/path/to/cwd";
  const filenames: readonly string[] = ["filename.00", "filename.01"];

  it("should prepend CWD to every filename in an array", () => {
    expect(resolveAbsolutePaths(cwd)(filenames)).toStrictEqual([
      `${cwd}/${filenames[0]}`,
      `${cwd}/${filenames[1]}`,
    ]);
  });
});
