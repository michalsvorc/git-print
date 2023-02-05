/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-console */
import { execa } from "execa";
import logger from "./utils/logger.mjs";
import tsconfig from "../tsconfig.build.json" assert { type: "json" };

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "pruduction",
};
const options = { env };
const { outDir } = tsconfig.compilerOptions;

try {
  if (env.NODE_ENV === "production") {
    console.info("Cleaning directories:", outDir);
    const clean = await execa("del-cli", [outDir], options);
    logger(clean);
  }

  console.info("Build env:", env);
  const compile = await execa("yarn", ["compile"], options);
  logger(compile);
} catch (error) {
  console.error(error);
}
