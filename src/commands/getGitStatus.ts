import type { ExecaReturnValue } from "execa";
import { execute } from "./execute.js";

export function getGitStatus(
  showUntrackedFiles: boolean,
  cwd: string
): Promise<ExecaReturnValue> {
  const command = "git";
  const args = [
    "status",
    "--porcelain",
    "--no-renames",
    `--untracked-files=${showUntrackedFiles ? "all" : "no"}`,
  ];
  const options = { cwd };

  return execute(command)(args, options);
}
