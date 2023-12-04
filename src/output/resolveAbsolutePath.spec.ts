import { describe, expect, it } from "vitest";
import { resolveAbsolutePath } from "./resolveAbsolutePath.js";

describe("Resolve absolute path", () => {
  const cwd = "/path/to/cwd";
  const filename = "filename.ext";

  it("should construct absolute path from CWD and filename", () => {
    expect(resolveAbsolutePath(cwd, filename)).toEqual(`${cwd}/${filename}`);
  });
});
