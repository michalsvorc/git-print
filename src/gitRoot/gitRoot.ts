import type { ExecaReturnValue } from "execa";
import { executeCommand } from "../executeCommand/index.js";

export async function gitRoot(): Promise<ExecaReturnValue> {
  return executeCommand("git")(["rev-parse", "--show-toplevel"])(undefined);
}
