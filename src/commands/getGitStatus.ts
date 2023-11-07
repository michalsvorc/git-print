import type { ExecaReturnValue } from "execa";
import { execute } from "./execute.js";

export async function getGitStatus(cwd: string): Promise<ExecaReturnValue> {
  const command = "git";
  const args = [
    "status",
    "--porcelain",
    "--no-renames",
    "--untracked-files=all",
  ];
  const options = { cwd };

  return await execute(command)(args, options);
}
