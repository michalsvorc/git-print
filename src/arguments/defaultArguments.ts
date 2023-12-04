import type { GitStatusArguments } from "../types.js";

const defaultGitStatusArguments: GitStatusArguments = {
  deleted: true,
  staged: true,
  stagedOnly: false,
  unstaged: true,
  untracked: true,
};

export { defaultGitStatusArguments };
