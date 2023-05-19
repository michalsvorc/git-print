import { describe, expect, it } from "vitest";
import { castArgumentToBoolean } from "./castArgumentToBoolean.js";

describe("Cast argument to Boolean", () => {
  it('should return Boolean true for string "true"', () => {
    const expected = true;

    expect(castArgumentToBoolean("true")).toBe(expected);
  });

  it('should return Boolean false for string "true"', () => {
    const expected = false;

    expect(castArgumentToBoolean("false")).toBe(expected);
  });

  it("should return Boolean false for all other cases", () => {
    const expected = false;

    expect(castArgumentToBoolean("string")).toBe(expected);
    expect(castArgumentToBoolean(1)).toBe(expected);
    expect(castArgumentToBoolean(null)).toBe(expected);
    expect(castArgumentToBoolean(undefined)).toBe(expected);
  });
});
