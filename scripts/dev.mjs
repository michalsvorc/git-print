/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-console */
import { execa } from "execa";
import logger from "./utils/logger.mjs";

const env = {
  NODE_ENV: "development",
};
const options = { env };

try {
  const compile = await execa("yarn", ["compile"], options);
  logger(compile);

  const start = await execa("yarn", ["start"], options);
  logger(start);
} catch (error) {
  console.error(error);
}
