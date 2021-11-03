import { parseArgv } from "./parseArgv";

describe("Parsing argv", () => {
  it("should return undefined arguments as undefined", async () => {
    expect(parseArgv(undefined)).toBeUndefined();
  });

  it("should parse boolean arguments as a boolean", async () => {
    expect(parseArgv(false)).toBe(false);
    expect(parseArgv(true)).toBe(true);
  });

  it("should parse boolean string arguments as a boolean", async () => {
    expect(parseArgv("false")).toBe(false);
    expect(parseArgv("true")).toBe(true);
  });

  it("should return other string arguments as strings", async () => {
    expect(parseArgv("A")).toBe("A");
  });
});
