import { castArgumentToBoolean, castArgumentToString } from "./castArgument.js";
import { describe, expect, it } from "vitest";

describe("Cast argument", () => {
  describe("to Boolean", () => {
    it('should return Boolean true for string "true"', () => {
      expect(castArgumentToBoolean("true")).toBe(true);
    });

    it('should return Boolean false for string "false"', () => {
      expect(castArgumentToBoolean("false")).toBe(false);
    });

    it("should return undefined when the argument was not provided", () => {
      expect(castArgumentToBoolean(undefined)).toBe(undefined);
    });

    it("should return Boolean false for all other cases", () => {
      const expected = false;

      expect(castArgumentToBoolean("abc")).toBe(expected);
      expect(castArgumentToBoolean(1)).toBe(expected);
      expect(castArgumentToBoolean(null)).toBe(expected);
    });
  });

  describe("to String", () => {
    it("should return string", () => {
      expect(castArgumentToString("true")).toBe("true");
      expect(castArgumentToString("abc")).toBe("abc");
      expect(castArgumentToString(1)).toBe("1");
      expect(castArgumentToString(null)).toBe("null");
    });

    it("should return undefined when the argument was not provided", () => {
      expect(castArgumentToString(undefined)).toBe(undefined);
    });
  });
});
