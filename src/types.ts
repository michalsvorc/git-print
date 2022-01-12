export type Path = string;
export type StatusDictionary = ReadonlyMap<string, ReadonlyArray<string>>;
export type StatusOutput = ReadonlyArray<string>;
export interface GitArgumentsOptions {
  readonly untracked: boolean;
}
export interface FilterOptions {
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly unstaged: boolean;
}

// eslint-disable-next-line functional/prefer-readonly-type
export type MutableStatusDictionary = Map<string, ReadonlyArray<string>>;
