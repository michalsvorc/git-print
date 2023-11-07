import type { GitStatusArguments } from "../types.js";

const stagedOnlyFilterOptions: Partial<GitStatusArguments> = {
  deleted: false,
  staged: true,
  unstaged: false,
};

export { stagedOnlyFilterOptions };
