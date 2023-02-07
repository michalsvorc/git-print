/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export function logger({ stdout, stderr } = {}) {
  Boolean(stdout) && console.info(stdout);
  Boolean(stderr) && console.error(stderr);

  if (!stdout && !stderr) {
    console.error("Logger: No logging payload provided.");
  }
}
