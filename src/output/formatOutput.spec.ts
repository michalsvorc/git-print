import { describe, expect, it } from "vitest";
import type { StatusDictionary } from "src/types.js";
import { formatOutput } from "./formatOutput.js";

describe("Format output", () => {
  const filenamesA: readonly string[] = ["filename.a1", "filename.a2"];
  const filenamesB: readonly string[] = ["filename.b1"];
  const statusDictionary: StatusDictionary = new Map();

  it("should create an array of all filenames from status dictionary", () => {
    statusDictionary.set("M ", filenamesA);
    statusDictionary.set(" M", filenamesB);

    expect(formatOutput(statusDictionary)).toStrictEqual([
      "filename.a1",
      "filename.a2",
      "filename.b1",
    ]);
  });
});
