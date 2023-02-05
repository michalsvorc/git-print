import { describe, expect, it } from "vitest";
import { parseArgv } from "./parseArgv.js";

describe("Parsing argv", () => {
  it("should return undefined arguments as undefined", () => {
    expect(parseArgv(undefined)).toBeUndefined();
  });

  it("should parse boolean arguments as a boolean", () => {
    expect(parseArgv(false)).toBe(false);
    expect(parseArgv(true)).toBe(true);
  });

  it("should parse boolean string arguments as a boolean", () => {
    expect(parseArgv("false")).toBe(false);
    expect(parseArgv("true")).toBe(true);
  });

  it("should return other string arguments as strings", () => {
    expect(parseArgv("A")).toBe("A");
  });
});
