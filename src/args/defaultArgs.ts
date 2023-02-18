import type { Arguments } from "./Arguments.type.js";
import { gitRoot } from "../gitRoot/index.js";

const defaultArgs: Arguments = {
  cwd: (await gitRoot()).stdout,
  deleted: true,
  staged: true,
  stagedOnly: false,
  unstaged: true,
  untracked: true,
};

export default defaultArgs;
