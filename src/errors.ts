class UnresolvedCWDError extends Error {
  constructor(message: string) {
    super(`Unable to correctly resolve CWD. ${message}`);
  }
}

export { UnresolvedCWDError };
