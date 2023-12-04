import type { CWDArguments } from "src/types.js";
import { getGitRoot } from "../commands/getGitRoot.js";

type CWD = CWDArguments["cwd"];

export async function parseCWDInputArguments(
  cwd: CWD | undefined
): Promise<CWD> {
  if (!cwd) {
    const gitRootResult = await getGitRoot();
    return gitRootResult.stdout;
  }
  return cwd;
}
