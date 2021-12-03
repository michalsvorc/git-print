import { MutableStatusDictionary, Path } from "src/types";

import { createFileOutput } from "./createFileOutput";

const filenames0: ReadonlyArray<Path> = ["filename.00", "filename.01"];

const filenames1: ReadonlyArray<Path> = ["filename.02"];

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
