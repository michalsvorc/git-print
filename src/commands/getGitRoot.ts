import type { ExecaReturnValue } from "execa";
import { execute } from "./execute.js";

export async function getGitRoot(): Promise<ExecaReturnValue> {
  const command = "git";
  const args = ["rev-parse", "--show-toplevel"];

  return await execute(command)(args);
}
