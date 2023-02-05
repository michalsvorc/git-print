import { describe, expect, it } from "vitest";
import { gitArguments } from "./gitArguments.js";

describe("Git arguments", () => {
  describe("--untracked-files flag", () => {
    const UNTRACKED_FILES_FLAG = "--untracked-files";
    // TODO
    // const untrackedFilesFlagRegExp = new RegExp(`^${UNTRACKED_FILES_FLAG}=`);

    function comparator(arg: string) {
      return arg.startsWith("--untracked-files=");
    }

    it("should be set to 'all' with {untracked: true} option", () => {
      const args = gitArguments({ untracked: true });

      expect(args.find(comparator)).toBe(`${UNTRACKED_FILES_FLAG}=all`);
      expect(args.filter(comparator).length).toBe(1);
    });

    it("should be set to 'no' with {untracked: false} option", () => {
      const args = gitArguments({ untracked: false });

      expect(args.find(comparator)).toBe(`${UNTRACKED_FILES_FLAG}=no`);
      expect(args.filter(comparator).length).toBe(1);
    });
  });
});
