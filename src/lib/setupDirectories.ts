export function appendUniqueDirectories(
  existing: readonly string[],
  incoming: readonly string[],
): string[] {
  const result = [...existing];
  const seen = new Set(existing);
  for (const path of incoming) {
    if (!seen.has(path)) {
      seen.add(path);
      result.push(path);
    }
  }
  return result;
}

export function validateDirectories(
  paths: readonly string[],
  validateDirectory: (path: string) => Promise<string>,
): Promise<string[]> {
  return Promise.all(paths.map(validateDirectory));
}
