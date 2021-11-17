import path from "path";

import { getProjectPath } from "./git";

import shell from "shelljs";

const dirBuild = path.join(getProjectPath(), "dist");

// Clean build directory
shell.test("-d", dirBuild) &&
  shell.ls(dirBuild).stdout.length &&
  shell.rm("-r", path.join(dirBuild, "*"));
