import { describe, expect, it } from "vitest";
import { stagedOnlyFilterOptions } from "./stagedOnlyFilterOptions.js";

describe("Staged only filter options", () => {
  it("should return an object with options to get only git staged files", () => {
    expect(stagedOnlyFilterOptions).toStrictEqual({
      deleted: false,
      staged: true,
      unstaged: false,
    });
  });
});
