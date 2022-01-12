import { ExecaReturnValue } from "execa";

import { executeCommand } from "../executeCommand";
import { Path } from "../types";

export async function gitRoot(): Promise<ExecaReturnValue<Path>> {
  return executeCommand("git")(["rev-parse", "--show-toplevel"])(undefined);
}
