import { describe, expect, it } from "vitest";
import type { MutableStatusDictionary } from "src/types.js";
import { createFileOutput } from "./createFileOutput.js";

const filenames0: readonly string[] = ["filename.00", "filename.01"];

const filenames1: readonly string[] = ["filename.02"];

const statusDictionary: MutableStatusDictionary = new Map();

statusDictionary.set("M ", filenames0);
statusDictionary.set(" M", filenames1);

describe("Create output", () => {
  it("should create an array of filenames from status disctionary", () => {
    expect(createFileOutput(statusDictionary)).toStrictEqual([
      ...filenames0,
      ...filenames1,
    ]);
  });
});
