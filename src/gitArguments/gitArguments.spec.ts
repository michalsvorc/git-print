import { gitArguments } from "./gitArguments";

describe("Git arguments", () => {
  describe("--untracked-files flag", () => {
    const UNTRACKED_FILES_FLAG = "--untracked-files";
    const untrackedFilesFlagRegExp = new RegExp(`^${UNTRACKED_FILES_FLAG}=`);

    function comparator(arg: string) {
      return untrackedFilesFlagRegExp.test(arg);
    }

    it("should be set to 'all' with {untracked: true} option", async () => {
      const args = gitArguments({ untracked: true });

      expect(args.find(comparator)).toBe(`${UNTRACKED_FILES_FLAG}=all`);
      expect(args.filter(comparator).length).toBe(1);
    });

    it("should be set to 'no' with {untracked: false} option", async () => {
      const args = gitArguments({ untracked: false });

      expect(args.find(comparator)).toBe(`${UNTRACKED_FILES_FLAG}=no`);
      expect(args.filter(comparator).length).toBe(1);
    });
  });
});
