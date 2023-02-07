/* eslint-disable node/no-unpublished-import */
import { execa } from "execa";
import { logger } from "./utils/logger.mjs";
import tsconfig from "../tsconfig.build.json" assert { type: "json" };

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "pruduction",
};
const executionOptions = { env };
const { outDir } = tsconfig.compilerOptions;

try {
  if (env.NODE_ENV === "production") {
    logger({ stdout: `Cleaning directories: ${outDir}` });
    await execa("del-cli", [outDir], executionOptions);
  }

  logger({ stdout: `Build env: ${JSON.stringify(env)}` });
  await execa("yarn", ["compile"], executionOptions);
} catch (error) {
  logger({ stderr: error });
}
