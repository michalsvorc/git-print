import type { ExecaReturnValue } from "execa";
import { execute } from "./execute.js";

export async function getGitStatus(
  cwd: string,
  showUntrackedFiles: boolean
): Promise<ExecaReturnValue> {
  const command = "git";
  const args = [
    "status",
    "--porcelain",
    "--no-renames",
    `--untracked-files=${showUntrackedFiles ? "all" : "no"}`,
  ];
  const options = { cwd };

  try {
    return await execute(command)(args, options);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Returning git status output failed.");
    throw error;
  }
}
