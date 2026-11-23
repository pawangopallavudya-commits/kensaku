import { describe, expect, it, vi } from "vitest";
import { appendUniqueDirectories, validateDirectories } from "./setupDirectories";

describe("setup directory selection", () => {
  it("canonicalizes picker paths and keeps only the first copy in selection order", async () => {
    const validateDirectory = vi.fn(async (path: string) => {
      if (path === "/work/docs-alias") return "/work/docs";
      return path;
    });

    const canonicalPaths = await validateDirectories(
      ["/work/docs-alias", "/work/docs", "/work/photos", "/work/photos"],
      validateDirectory,
    );

    expect(appendUniqueDirectories(["/work/docs"], canonicalPaths)).toEqual([
      "/work/docs",
      "/work/photos",
    ]);
    expect(validateDirectory).toHaveBeenCalledTimes(4);
  });

  it("adds a valid new folder while preserving existing selections", () => {
    expect(appendUniqueDirectories(["/work/docs"], ["/work/photos"])).toEqual([
      "/work/docs",
      "/work/photos",
    ]);
  });
});
