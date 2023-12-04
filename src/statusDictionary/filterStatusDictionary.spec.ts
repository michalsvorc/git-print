import type { GitStatusArguments, StatusDictionary } from "../types.js";
import { beforeEach, describe, expect, it } from "vitest";
import { defaultGitStatusArguments } from "../arguments/defaultArguments.js";
import { filterStatusDictionary } from "./filterStatusDictionary.js";

const unstagedStatusFrom = (key: string) => `${key} `;
const stagedStatusFrom = (key: string) => ` ${key}`;

function statusDictionaryFactory(keys: string[]): StatusDictionary {
  const statusDictionary: StatusDictionary = new Map();

  keys.map((key) => {
    statusDictionary.set(unstagedStatusFrom(key), [`${key}_unstaged.ext`]);
    statusDictionary.set(stagedStatusFrom(key), [`${key}_staged.ext`]);
  });

  return statusDictionary;
}

describe("Filtering status dictionary", () => {
  let statusDictionary: StatusDictionary;

  const deletedKey = "D";
  const modifiedKey = "M";
  const addedKey = "A";
  const untrackedKey = "??";

  beforeEach(() => {
    statusDictionary = statusDictionaryFactory([
      addedKey,
      modifiedKey,
      deletedKey,
    ]);
    statusDictionary.set(untrackedKey, [`${untrackedKey}.ext`]);
  });

  describe("deleted argument", () => {
    it("should leave OUT deleted files when set to `false`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        deleted: false,
      };

      expected.delete(unstagedStatusFrom(deletedKey));
      expected.delete(stagedStatusFrom(deletedKey));

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });

    it("should keep IN deleted files when set to `true`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        deleted: true,
      };

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });
  });

  describe("untracked argument", () => {
    it("should leave OUT untracked files when set to `false`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        untracked: false,
      };

      expected.delete(untrackedKey);

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });

    it("should keep IN untracked files when set to `true`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        untracked: true,
      };

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });
  });

  describe("staged argument", () => {
    it("should leave OUT staged files when set to `false`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        staged: false,
      };

      expected.delete(stagedStatusFrom(addedKey));
      expected.delete(stagedStatusFrom(modifiedKey));
      expected.delete(stagedStatusFrom(deletedKey));
      expected.delete(untrackedKey);

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });

    it("should keep IN staged files when set to `true`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        staged: true,
      };

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });
  });

  describe("unstaged argument", () => {
    it("should leave OUT unstaged files when set to `false`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        unstaged: false,
      };

      expected.delete(unstagedStatusFrom(addedKey));
      expected.delete(unstagedStatusFrom(modifiedKey));
      expected.delete(unstagedStatusFrom(deletedKey));

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });

    it("should keep IN unstaged files when set to `true`", () => {
      const expected = new Map(statusDictionary);
      const options: Omit<GitStatusArguments, "cwd"> = {
        ...defaultGitStatusArguments,
        unstaged: true,
      };

      expect(filterStatusDictionary(statusDictionary)(options)).toStrictEqual(
        expected
      );
    });
  });
});
