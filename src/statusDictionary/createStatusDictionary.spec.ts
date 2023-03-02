import { describe, expect, it } from "vitest";
import type { StatusOutput } from "../types.js";
import { createStatusDictionary } from "./createStatusDictionary.js";

const statusOutput: StatusOutput = [
  "M  file.00",
  "M  file.01",
  " M file.02",
  "MM file.03",
];

const statusDictionary = new Map();

statusDictionary.set("M ", ["file.00", "file.01"]);
statusDictionary.set(" M", ["file.02"]);
statusDictionary.set("MM", ["file.03"]);

describe("Status dictionary creation", () => {
  it("should create dictionary from status output", () => {
    expect(createStatusDictionary(statusOutput)).toStrictEqual(
      statusDictionary
    );
  });
});
