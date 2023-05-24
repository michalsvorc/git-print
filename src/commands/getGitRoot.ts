import type { ExecaReturnValue } from "execa";
import { execute } from "./execute.js";

export async function getGitRoot(): Promise<ExecaReturnValue> {
  const command = "git";
  const args = ["rev-parse", "--show-toplevel"];

  try {
    return await execute(command)(args);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Searching for git directory root failed.");
    throw error;
  }
}
