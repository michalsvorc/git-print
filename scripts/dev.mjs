/* eslint-disable node/no-unpublished-import */
import { execa } from "execa";
import { logger } from "./utils/logger.mjs";

const env = {
  NODE_ENV: "development",
};
const executionOptions = { env };

try {
  await execa("yarn", ["compile"], executionOptions);
  const startProcess = await execa("yarn", ["start"], executionOptions);
  logger(startProcess);
} catch (error) {
  logger({ stderr: error });
}
