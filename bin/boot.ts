import path from "path";

import { getProjectPath, registerHooks } from "./git";

import shell from "shelljs";

const dirHooks = path.join(getProjectPath(), ".hooks");

registerHooks(dirHooks) && shell.echo("Git hooks registered.");
