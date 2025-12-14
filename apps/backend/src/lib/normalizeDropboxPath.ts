function normalizeDropboxPath(...parts: (string | null | undefined)[]): string {
  let path =
    "/" +
    parts
      .filter(Boolean) // remove empty, null, undefined
      .map((p) => (p as string).replace(/^\/+|\/+$/g, "")) // strip leading & trailing slashes
      .join("/");

  // Final safety: collapse any remaining '//' just in case
  path = path.replace(/\/{2,}/g, "/");

  return path;
}

export default normalizeDropboxPath;
