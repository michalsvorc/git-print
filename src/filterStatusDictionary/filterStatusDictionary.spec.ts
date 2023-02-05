import { describe, expect, it } from "vitest";
import type { MutableStatusDictionary } from "src/types.js";
import { filterStatusDictionary } from "./filterStatusDictionary.js";

describe("Filtering status dictionary", () => {
  const statusDictionary: MutableStatusDictionary = new Map();

  statusDictionary.set("M ", ["staged"]);
  statusDictionary.set(" D", ["deleted"]);
  statusDictionary.set(" M", ["unstaged"]);

  const filterWith = filterStatusDictionary(statusDictionary);

  it("should leave unfiltered with every option set to true", () => {
    expect(
      filterWith({
        deleted: true,
        staged: true,
        unstaged: true,
      })
    ).toStrictEqual(statusDictionary);
  });

  it("should filter out entries for deleted status", () => {
    const filteredDictionary: MutableStatusDictionary = new Map();

    filteredDictionary.set("M ", ["staged"]);
    filteredDictionary.set(" M", ["unstaged"]);

    expect(
      filterWith({
        deleted: false,
        staged: true,
        unstaged: true,
      })
    ).toStrictEqual(filteredDictionary);
  });

  it("should filter out entries for staged files", () => {
    const filteredDictionary: MutableStatusDictionary = new Map();

    filteredDictionary.set(" D", ["deleted"]);
    filteredDictionary.set(" M", ["unstaged"]);

    expect(
      filterWith({
        deleted: true,
        staged: false,
        unstaged: true,
      })
    ).toStrictEqual(filteredDictionary);
  });

  it("should filter out entries for unstaged files", () => {
    const filteredDictionary: MutableStatusDictionary = new Map();

    filteredDictionary.set("M ", ["staged"]);

    expect(
      filterWith({
        deleted: true,
        staged: true,
        unstaged: false,
      })
    ).toStrictEqual(filteredDictionary);
  });
});
