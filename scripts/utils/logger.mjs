/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export default ({ stdout, stderr }) =>
  (stdout || stderr) && console.info(stdout, stderr);
