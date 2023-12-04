// import * as createStatusDictionary from "./statusDictionary/createStatusDictionary.js";
import * as filterStatusDictionary from "./statusDictionary/filterStatusDictionary.js";
// import * as formatOutput from "./output/formatOutput.js";
import { main } from "./main.js";
import * as getGitStatus from "./commands/getGitStatus.js";
// import * as parseArguments from "./arguments/castInputArguments.js";
// import * as readInputArguments from "./arguments/readInputArguments.js";
// import * as resolveAbsolutePath from "./output/resolveAbsolutePath.js";

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { InputArguments, StatusDictionary } from "./types.js";
import type { ExecaReturnValue } from "execa";
import * as getGitRoot from "./commands/getGitRoot.js";
import { UnresolvedCWDError } from "./errors.js";
import * as parseCWDInputArguments from "./arguments/parseCWDInputArguments.js";
import * as splitInputArguments from "./arguments/splitInputArguments.js";
import * as parseGitStatusInputArguments from "./arguments/parseGitStatusInputArguments.js";
import * as createStatusDictionary from "./statusDictionary/createStatusDictionary.js";

vi.mock("execa");

describe("Main library function", () => {
  vi.spyOn(getGitRoot, "getGitRoot").mockResolvedValue({
    stdout: "/path/to/git/root",
  } as ExecaReturnValue);
  vi.spyOn(getGitStatus, "getGitStatus").mockResolvedValue({
    stdout: "M test.ext",
  } as ExecaReturnValue);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("parameters", () => {
    it("should resolve with no input arguments", async () => {
      const args = undefined;
      await expect(main(args)).resolves.not.toThrowError();
    });

    it("should resolve with empty object as input arguments", async () => {
      const args = {};
      await expect(main(args)).resolves.not.toThrowError();
    });

    it("should resolve with CWD arguments only", async () => {
      const args = { cwd: "/path/to/cwd" };
      await expect(main(args)).resolves.not.toThrowError();
    });

    it("should resolve with git status arguments only", async () => {
      const args = {
        deleted: false,
        staged: false,
        stagedOnly: false,
        unstaged: false,
        untracked: false,
      };
      await expect(main(args)).resolves.not.toThrowError();
    });

    it("should resolve with all arguments", async () => {
      const args = {
        cwd: "/path/to/cwd",
        deleted: false,
        staged: false,
        stagedOnly: false,
        unstaged: false,
        untracked: false,
      };
      await expect(main(args)).resolves.not.toThrowError();
    });

    it("should resolve with partial arguments", async () => {
      const args = {
        stagedOnly: false,
      };
      await expect(main(args)).resolves.not.toThrowError();
    });
  });

  describe("process", () => {
    it("should pass input arguments to split arguments method", async () => {
      const inputArguments: InputArguments = {
        cwd: "/path/to/cwd",
        deleted: false,
      };
      const splitInputArgumentsSpy = vi.spyOn(
        splitInputArguments,
        "splitInputArguments"
      );
      await main(inputArguments);

      expect(splitInputArgumentsSpy).toHaveBeenCalledTimes(1);
      expect(splitInputArgumentsSpy).toHaveBeenCalledWith(inputArguments);
    });

    it("should pass cwd arguments to parsing method", async () => {
      const inputArguments: InputArguments = { cwd: "/path/to/cwd" };
      const parseCWDInputArgumentSpy = vi.spyOn(
        parseCWDInputArguments,
        "parseCWDInputArguments"
      );
      await main(inputArguments);

      expect(parseCWDInputArgumentSpy).toHaveBeenCalledTimes(1);
      expect(parseCWDInputArgumentSpy).toHaveBeenCalledWith(inputArguments.cwd);
    });

    it("should pass git status arguments to parsing method", async () => {
      const parseGitStatusInputArgumentsSpy = vi.spyOn(
        parseGitStatusInputArguments,
        "parseGitStatusInputArguments"
      );
      const inputArguments: InputArguments = { deleted: true };
      await main(inputArguments);

      expect(parseGitStatusInputArgumentsSpy).toHaveBeenCalledTimes(1);
      expect(parseGitStatusInputArgumentsSpy).toHaveBeenCalledWith({
        staged: undefined,
        stagedOnly: undefined,
        unstaged: undefined,
        untracked: undefined,
        ...inputArguments,
      });
    });

    it("should pass cwd argument to get git status method", async () => {
      const inputArguments: InputArguments = { cwd: "/path/to/cwd" };
      const getGitStatusSpy = vi.spyOn(getGitStatus, "getGitStatus");

      await main(inputArguments);

      expect(getGitStatusSpy).toHaveBeenCalledTimes(1);
      expect(getGitStatusSpy).toHaveBeenCalledWith(inputArguments.cwd);
    });

    it("should split git status output by newlines and pass it to create status dictionary method", async () => {
      const inputArguments: InputArguments = { cwd: "/path/to/cwd" };
      const stringWithNewlines = "A\nB\nC";
      const getGitStatusMock = vi
        .spyOn(getGitStatus, "getGitStatus")
        .mockResolvedValueOnce({
          stdout: stringWithNewlines,
        } as ExecaReturnValue);
      const createStatusDictionarySpy = vi.spyOn(
        createStatusDictionary,
        "createStatusDictionary"
      );

      await main(inputArguments);

      expect(getGitStatusMock).toHaveBeenCalledTimes(1);
      expect(createStatusDictionarySpy).toHaveBeenCalledTimes(1);
      expect(createStatusDictionarySpy).toHaveBeenCalledWith(
        inputArguments.cwd,
        ["A", "B", "C"]
      );
    });

    it("should immediately return created status dictionary when no input arguments were given", async () => {
      const statusDictionary = new Map();
      statusDictionary.set("A", 1);
      const createStatusDictionaryMock = vi
        .spyOn(createStatusDictionary, "createStatusDictionary")
        .mockReturnValueOnce(statusDictionary as StatusDictionary);

      const result = await main(undefined);

      expect(createStatusDictionaryMock).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(statusDictionary);
    });
  });

  describe("exceptions", () => {
    it("should throw unresolved CWD error when parsing CWD input arguments return falsy cwd value", async () => {
      vi.spyOn(
        parseCWDInputArguments,
        "parseCWDInputArguments"
      ).mockResolvedValueOnce("");

      await expect(main()).rejects.toThrowError(
        new UnresolvedCWDError("CWD is an empty value")
      );
    });

    it("should throw unresolved CWD error when parsing CWD input arguments throws", async () => {
      const errorMessage = "Can't parse";
      vi.spyOn(
        parseCWDInputArguments,
        "parseCWDInputArguments"
      ).mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      await expect(main()).rejects.toThrowError(
        new UnresolvedCWDError(errorMessage)
      );
    });
  });

  describe("empty result", () => {
    const emptyResult = new Map();

    it("should be returned when git status method returns an empty result", async () => {
      const getGitStatusMock = vi
        .spyOn(getGitStatus, "getGitStatus")
        .mockResolvedValueOnce({ stdout: [] } as unknown as ExecaReturnValue);

      const result = await main();

      expect(getGitStatusMock).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(emptyResult);
    });

    it("should be returned when filtered status dictionary returns an empty result", async () => {
      const filterStatusDictionaryMock = vi
        .spyOn(filterStatusDictionary, "filterStatusDictionary")
        .mockImplementationOnce(() => () => new Map());

      const result = await main({ deleted: true });

      expect(filterStatusDictionaryMock).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(emptyResult);
    });
  });
});
