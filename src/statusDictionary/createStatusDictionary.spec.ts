import { describe, expect, it } from "vitest";
import type { StatusOutput } from "../types.js";
import { createStatusDictionary } from "./createStatusDictionary.js";

describe("Status dictionary creation", () => {
  const cwd = "/path/to/cwd";
  const statusOutput: StatusOutput = [
    "M  file00.ext",
    "M  file01.ext",
    " M file02.ext",
    "MM file03.ext",
  ];

  it("should return status dictionary from status output", () => {
    const statusDictionary = new Map();
    statusDictionary.set("M ", [`${cwd}/file00.ext`, `${cwd}/file01.ext`]);
    statusDictionary.set(" M", [`${cwd}/file02.ext`]);
    statusDictionary.set("MM", [`${cwd}/file03.ext`]);

    expect(createStatusDictionary(cwd, statusOutput)).toStrictEqual(
      statusDictionary
    );
  });
});
