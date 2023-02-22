export type StatusDictionary = Map<string, readonly string[]>;
export type StatusOutput = readonly string[];
export interface GitArgumentsOptions {
  readonly untracked: boolean;
}
export interface FilterOptions {
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly unstaged: boolean;
}
