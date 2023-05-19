import type { FilterOptions } from "../types.js";

const stagedOnlyFilterOptions: FilterOptions = {
  deleted: false,
  staged: true,
  unstaged: false,
};

export { stagedOnlyFilterOptions };
