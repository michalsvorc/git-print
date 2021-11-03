import * as path from "path";

import { Path } from "../types";

export function addPathToFilenames(filenames: ReadonlyArray<string>) {
  return function addPathToFilenamesCwd(cwd: Path) {
    return filenames.map((filename) => path.resolve(cwd, filename));
  };
}
