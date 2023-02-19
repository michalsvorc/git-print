import type { Arguments } from "./Arguments.type.js";
import { getGitRoot } from "../commands/getGitRoot.js";

const defaultArgs: Arguments = {
  cwd: (await getGitRoot()).stdout,
  deleted: true,
  staged: true,
  stagedOnly: false,
  unstaged: true,
  untracked: true,
};

export default defaultArgs;
