import * as createStatusDictionary from "./statusDictionary/createStatusDictionary.js";
import * as filterStatusDictionary from "./statusDictionary/filterStatusDictionary.js";
import * as formatOutput from "./output/formatOutput.js";
import * as getArgs from "./args/getArgs.js";
import * as getGitStatus from "./commands/getGitStatus.js";
import * as parseArgs from "./args/parseArgs.js";
import * as resolveAbsolutePaths from "./output/resolveAbsolutePaths.js";

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Arguments } from "./args/Arguments.type.js";
import type { ExecaReturnValue } from "execa";
import type { StatusDictionary } from "./types.js";
import { main } from "./main.js";

vi.mock("execa");
vi.mock("./commands/getGitRoot.ts", () => ({
  getGitRoot: vi.fn().mockResolvedValue({ stdout: "getGitRootResult" }),
}));

describe("Main function", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getArgsSpy = vi.spyOn(getArgs, "getArgs").mockReturnValue({
    _: [],
    cwd: "/cwd",
  });
  const parseArgsSpy = vi.spyOn(parseArgs, "parseArgs").mockReturnValue({
    cwd: "/cwd",
    deleted: true,
    staged: true,
    stagedOnly: false,
    unstaged: true,
    untracked: true,
  } as Arguments);
  const formatOutputSpy = vi.spyOn(formatOutput, "formatOutput");
  const createStatusDictionarySpy = vi.spyOn(
    createStatusDictionary,
    "createStatusDictionary"
  );
  const filterStatusDictionarySpy = vi.spyOn(
    filterStatusDictionary,
    "filterStatusDictionary"
  );
  const resolveAbsolutePathsSpy = vi.spyOn(
    resolveAbsolutePaths,
    "resolveAbsolutePaths"
  );

  describe("when there ARE modified files", () => {
    const getGitStatusSpy = vi
      .spyOn(getGitStatus, "getGitStatus")
      .mockResolvedValue({
        stdout: "M  file",
      } as ExecaReturnValue);

    it("should get program input arguments", async () => {
      await main();

      expect(getArgsSpy).toBeCalledTimes(1);
    });

    it("should parse program input arguments", async () => {
      await main();

      expect(parseArgsSpy).toBeCalledTimes(1);
      expect(parseArgsSpy).toBeCalledWith({
        _: [],
        cwd: "/cwd",
      });
    });

    it("should execute git status command", async () => {
      await main();

      expect(getGitStatusSpy).toBeCalledTimes(1);
      expect(getGitStatusSpy).toBeCalledWith("/cwd", true);
    });

    it("should create status dictionary from git status", async () => {
      await main();

      expect(createStatusDictionarySpy).toBeCalledTimes(1);
      expect(createStatusDictionarySpy).toBeCalledWith(["M  file"]);
    });

    it("should filter status dictionary", async () => {
      const statusDictionary: StatusDictionary = new Map();
      statusDictionary.set("M ", ["file"]);

      await main();

      expect(filterStatusDictionarySpy).toBeCalledTimes(1);
      expect(filterStatusDictionarySpy).toBeCalledWith(statusDictionary);
    });

    it("should format output from filtered status dictionary", async () => {
      const filteredStatusDictionary: StatusDictionary = new Map();
      filteredStatusDictionary.set("M ", ["file"]);

      await main();

      expect(formatOutputSpy).toBeCalledTimes(1);
      expect(formatOutputSpy).toBeCalledWith(filteredStatusDictionary);
    });

    it("should resolve absolute paths in formatted output", async () => {
      await main();

      expect(resolveAbsolutePathsSpy).toBeCalledTimes(1);
      expect(resolveAbsolutePathsSpy).toBeCalledWith("/cwd", ["file"]);
    });
  });

  describe("when there ARE NOT modified files", () => {
    const emptyResult: string[] = [];

    it("should stop execution on empty git status", async () => {
      const getGitStatusSpy = vi
        .spyOn(getGitStatus, "getGitStatus")
        .mockResolvedValue({
          stdout: "",
        } as ExecaReturnValue);

      const result = await main();

      expect(result).toEqual(emptyResult);
      expect(getArgsSpy).toBeCalled();
      expect(parseArgsSpy).toBeCalled();
      expect(getGitStatusSpy).toBeCalled();
      expect(createStatusDictionarySpy).not.toBeCalled();
      expect(filterStatusDictionarySpy).not.toBeCalled();
      expect(formatOutputSpy).not.toBeCalled();
      expect(resolveAbsolutePathsSpy).not.toBeCalled();
    });
  });

  describe("when there ARE NOT modified files according to filters set by input arguments", () => {
    const emptyResult: string[] = [];

    it("should stop execution on empty filtered status dictionary", async () => {
      const getGitStatusSpy = vi
        .spyOn(getGitStatus, "getGitStatus")
        .mockResolvedValue({
          stdout: "M  file",
        } as ExecaReturnValue);
      const filterStatusDictionarySpy = vi
        .spyOn(filterStatusDictionary, "filterStatusDictionary")
        .mockReturnValue(() => new Map());

      const result = await main();

      expect(result).toEqual(emptyResult);
      expect(getArgsSpy).toBeCalled();
      expect(parseArgsSpy).toBeCalled();
      expect(getGitStatusSpy).toBeCalled();
      expect(createStatusDictionarySpy).toBeCalled();
      expect(filterStatusDictionarySpy).toBeCalled();
      expect(formatOutputSpy).not.toBeCalled();
      expect(resolveAbsolutePathsSpy).not.toBeCalled();
    });
  });
});
