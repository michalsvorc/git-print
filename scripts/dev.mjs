/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-import */
import { execa } from "execa";

const env = {
  NODE_ENV: "development",
};
const executionOptions = { env };
await execa("yarn", ["compile"], executionOptions);
const startProcess = await execa("yarn", ["start"], executionOptions);

console.info(startProcess.stdout);
